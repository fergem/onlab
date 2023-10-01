using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
                Hours = 0,
                Location = job.Location,
                Description = job.Description,
                OwnerUserID = userID,
                Payment = job.Payment,
                MinRequiredExperience = job.MinRequiredExperience,
                Repeated = job.Repeated,
                StartDate = job.StartDate,
                EndDate = job.EndDate,
                Status = Status.Available,
                Days = !job.Days.IsNullOrEmpty() ? job.Days : Enum.GetValues<DaysOfWeek>(),
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
                    .Include(s => s.Pets)
                    .Where(s => s.Repeated == filter.Repeated)
                    .Where(s => s.Status == Status.Available);


            //Filter by type
            switch (filter.Type)
            {
                case JobType.Boarding:
                    query = query.Where(s => s.Type == JobType.Boarding);
                    break;
                case JobType.Walking:
                    query = query.Where(s => s.Type == JobType.Walking);
                    break;
                case JobType.Sitting:
                    query = query.Where(s => s.Type == JobType.Sitting);
                    break;
                case JobType.Visit:
                    query = query.Where(s => s.Type == JobType.Visit);
                    break;
                default:
                    break;
            }

           if(filter.Species is not null && filter.Species.Count > 0) query = query.Where(job => job.Pets.Any(petJob => filter.Species.Contains(petJob.Pet.Species)));
           // if (filter.Repeated && filter.Days is not null) query = query.Where(job => job.Days.ToList().Any(day => filter.Days.ToList().Contains(day)));

           var asd = await query.ToListAsync();

           if (filter.Repeated && filter.Days is not null) asd = asd.Where(s => s.Days.Any(day => filter.Days.Contains(day))).ToList();


            return asd.Select(s => ModelMapper.ToJobModel(s)).ToList();
        }

        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobFilterParticipant filter)
        { 
            return await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets)
                .Where(s => s.OwnerUserID == userID)
                .Where(s => s.Status == filter.Status)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }
        public async Task<IReadOnlyCollection<Job>> ListApprovals(int userID)
        {
            return await dbcontext.Jobs
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .Where(s => s.OwnerUserID == userID && s.Status == Status.Approving && s.PetSitterUserID != null)
               .Select(s => ModelMapper.ToJobModel(s))
               .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID, JobFilterParticipant filter)
        {
            return await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets)
                .Where(d => d.PetSitterUserID == userID)
                .Where(s => s.Status == filter.Status)
                .OrderByDescending(s => filter.Status == Status.Upcoming ? s.StartDate : s.EndDate)
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

            jobToTake.Status = Status.Approving;
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

            jobToApprove.Status = Status.Upcoming;

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

        public async Task RemoveJobsDependentOnPet(int petID)
        {
            var dbPet = await dbcontext.Pets.FirstOrDefaultAsync(s=> s.ID == petID);
            if (dbPet == null)
                throw new Exception("Pet not found");

            var jobs = await dbcontext.Jobs
                .Include(s => s.Pets)
                .Where(s => s.Pets.Count == 1)
                .SelectMany(s => s.Pets.Where(s => s.PetID == petID)).ToListAsync();
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
