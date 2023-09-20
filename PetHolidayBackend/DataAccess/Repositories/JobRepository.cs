using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text.Json.Serialization;

namespace DataAccess.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly PetHolidayDbContext dbcontext;
        public JobRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Job> FindById(int jobID)
        {
            var job = await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets).FirstOrDefaultAsync(s => s.ID == jobID);
            if (job == null)
                throw new Exception("Job doesnt exist");
            return ModelMapper.ToJobModel(job);
        }

        public async Task<int> Insert(InsertJobModel job, int userID)
        {
            var insertJob = new DbJob()
            {
                Hours = job.Hours,
                Location = job.Location,
                Description = job.Description,
                OwnerUserID = userID,
                Payment = job.Payment,
                MinRequiredExperience = job.MinRequiredExperience,
                Repeated = job.Repeated,
                StartDate = job.StartDate,
                EndDate = job.EndDate,
                Status = Status.Available,
                Days = job.Days is not null ? string.Join(",", job.Days.Select(p => p.ToString()).ToArray()) : null,
                Title = job.Title,
                Type = job.Type,
            };

            var petJobs = new List<DbPetJob>();
            foreach (var petID in job.petIDs)
                petJobs.Add(new DbPetJob() { PetID = petID, Job = insertJob });
            
            await dbcontext.Jobs.AddAsync(insertJob);
            await dbcontext.PetJobs.AddRangeAsync(petJobs);
            await dbcontext.SaveChangesAsync();

            return insertJob.ID;
        }

        public async Task<IReadOnlyCollection<Job>> List(JobFilter filter)
        {
            IQueryable<DbJob> query = dbcontext.Jobs
                    .Include(s => s.OwnerUser)
                    .Include(s => s.PetSitterUser)
                    .Include(s => s.Pets);


            //Filtering továbbfejesztése vagy lecserélése
            switch(filter.Type)
            {
                // itt szűrés majd tovább szűrés
            }

            if (!filter.Repeated)
            {
                query = query
                    .Where(job =>
                        ((job.Pets != null && job.Pets.Count > 0) && job.Pets.All(s => filter.Species.Contains(s.Pet.Species))) &&
                        job.StartDate > filter.StartDate &&
                        ((filter.Type == JobType.Sitting && filter.Type == JobType.Boarding) ? job.EndDate < filter.EndDate : true) &&
                        job.Type == filter.Type
                    );
            }
            else
            {
                query = query
                    .Where(job =>
                        ((job.Pets != null && job.Pets.Count > 0) && job.Pets.All(s => filter.Species.Contains(s.Pet.Species))) &&
                        (filter.Days == null || job.Days != null && filter.Days.Any(fd => ModelMapper.ToJobDays(job.Days).Contains(fd))) &&
                        job.StartDate > filter.StartDate &&
                        job.Type == filter.Type
                    );
            }

            return await query.Select(s => ModelMapper.ToJobModel(s)).ToListAsync();
        }
 
        private bool getPredicate(DbJob job, JobFilter filter)
        {
            if (!filter.Repeated)
            {
                var speciesInJob = job.Pets.Select(s =>  s!.Pet!.Species ).Distinct().ToList();
                var jobContainsSpecies = speciesInJob.Intersect(filter.Species ?? speciesInJob);

                if (jobContainsSpecies is not null && job.StartDate > filter.StartDate && job.EndDate < filter.EndDate && job.Type == filter.Type)
                    return true;
            }
            else
            {
                var speciesInJob = job.Pets.Select(s => s!.Pet!.Species).Distinct().ToList();
                var jobContainsSpecies = speciesInJob.Intersect(filter.Species ?? speciesInJob);
                var jobArray = ModelMapper.ToJobDays(job.Days)?.Intersect(filter.Days ?? Enum.GetValues(typeof(Days)).Cast<Days>().ToList());

                if(jobArray is not null && job.StartDate > filter.StartDate)
                    return true;
            }

            //should not happen
            return false;
        }

        public IQueryable<Job> ListASd(JobFilter filter)
        {
            IQueryable<DbJob> query = dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets);

            if (!filter.Repeated)
            {
                query = query.Where(job => getPredicate(job, filter));
            }

            return query.Select(s => ModelMapper.ToJobModel(s));
        }

        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobFilter jobParameters)
        { 
            return await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }
        public async Task<IReadOnlyCollection<Job>> ListApprovals(int userID)
        {
            return await dbcontext.Jobs
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .Where(s => s.OwnerUserID == userID && s.Status == Status.Pending && s.PetSitterUserID != null)
               .Select(s => ModelMapper.ToJobModel(s))
               .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {
            return await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets)
                .Where(d => d.PetSitterUserID == userID)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }

        public async Task<Job> TakeJob(int jobID, int userID)
        {
            var jobToTake = await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .FirstOrDefaultAsync(s => s.ID == jobID);

            if (jobToTake is null)
                throw new Exception("There is no such job that you want to undertake");
            if (jobToTake.PetSitterUser != null)
                throw new Exception("Job is already taken");

            jobToTake.Status = Status.Pending;
            jobToTake.PetSitterUserID = userID;

            dbcontext.Update(jobToTake);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToTake);
        }

        public async Task<Job> ApproveUser(int jobID)
        {
            var jobToApprove = await dbcontext.Jobs
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToApprove == null)
                throw new Exception("There is no such job that you want to undertake");

            jobToApprove.Status = Status.Inprogress;

            dbcontext .Update(jobToApprove);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToApprove);
        }

        public async Task<Job> DeclineUser(int jobID)
        {
            var jobToDecline = await dbcontext.Jobs
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToDecline == null)
                throw new Exception("There is no such job that you want to undertake");

            jobToDecline.Status = Status.Available;
            jobToDecline.PetSitterUser = null;

            dbcontext.Update(jobToDecline);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToDecline);
        }

        public async Task<Job> FinishJob(int jobID)
        {
            var jobToFinish = await dbcontext.Jobs
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToFinish == null)
                throw new Exception("There is no such job that you want to undertake");

            jobToFinish.Status = Status.Done;

            dbcontext.Update(jobToFinish);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToFinish);
        }

        public async Task DeleteJob(int jobID)
        {
            var jobToDelete = await dbcontext.Jobs
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            dbcontext.Remove(jobToDelete);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<Job> UpdateJob(int jobID)
        {
            var jobToUpdate = await dbcontext.Jobs
              .Include(s => s.OwnerUser)
              .Include(s => s.PetSitterUser)
              .FirstAsync(s => s.ID == jobID);

            throw new NotImplementedException();
        }
    } 
}
