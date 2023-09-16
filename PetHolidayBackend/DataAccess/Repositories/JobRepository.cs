using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
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
            var job = await dbcontext.Jobs.FindAsync(jobID);
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
                StatusID = (int)StatusName.Available,
                Payment = job.Payment,
                MinRequiredExperience = job.MinRequiredExperience
            };

            var petJobs = new List<DbPetJob>();
            foreach (var petID in job.petIDs)
                petJobs.Add(new DbPetJob() { PetID = petID, Job = insertJob });
            
            await dbcontext.Jobs.AddAsync(insertJob);
            await dbcontext.PetJobs.AddRangeAsync(petJobs);
            await dbcontext.SaveChangesAsync();

            return insertJob.ID;
        }

        public async Task<IReadOnlyCollection<Job>> List(JobParameters jobParameters)
        {
            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets)
                .Where(s => s.Hours >= jobParameters.MinHours && s.Hours <= jobParameters.MaxHours && s.Status.Name == jobParameters.JobStatus)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobParameters jobParameters)
        { 
            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Include(s => s.Pets)
                .Where(s => s.OwnerUserID == userID && s.Hours >= jobParameters.MinHours && s.Hours <= jobParameters.MaxHours)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }
        public async Task<IReadOnlyCollection<Job>> ListApprovals(int userID)
        {
            return await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .Where(s => s.OwnerUserID == userID && s.Status.Name == StatusName.WaitingForApproval && s.PetSitterUserID != null)
               .Select(s => ModelMapper.ToJobModel(s))
               .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {
            return await dbcontext.Jobs
                .Include(s => s.Status)
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
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .FirstOrDefaultAsync(s => s.ID == jobID);

            if (jobToTake is null)
                throw new Exception("There is no such job that you want to undertake");
            if (jobToTake.PetSitterUser != null)
                throw new Exception("Job is already taken");

            jobToTake.Status = await dbcontext.Statuses.FirstOrDefaultAsync(s => s.Name == StatusName.WaitingForApproval) ?? throw new Exception("No status like this ");
            jobToTake.PetSitterUserID = userID;

            dbcontext.Update(jobToTake);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToTake);
        }

        public async Task<Job> ApproveUser(int jobID)
        {
            var jobToApprove = await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToApprove == null)
                throw new Exception("There is no such job that you want to undertake");

            jobToApprove.Status = await dbcontext.Statuses.FirstOrDefaultAsync(s => s.Name == StatusName.Inprogress) ?? throw new Exception("No status like this ");

            dbcontext .Update(jobToApprove);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToApprove);
        }

        public async Task<Job> DeclineUser(int jobID)
        {
            var jobToDecline = await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToDecline == null)
                throw new Exception("There is no such job that you want to undertake");

            jobToDecline.Status = await dbcontext.Statuses.FirstOrDefaultAsync(s => s.Name == StatusName.Available) ?? throw new Exception("No status like this ");
            jobToDecline.PetSitterUser = null;

            dbcontext.Update(jobToDecline);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToDecline);
        }

        public async Task<Job> FinishJob(int jobID)
        {
            var jobToFinish = await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToFinish == null)
                throw new Exception("There is no such job that you want to undertake");

            jobToFinish.Status = await dbcontext.Statuses.FirstOrDefaultAsync(s => s.Name == StatusName.Done) ?? throw new Exception("No status like this ");

            dbcontext.Update(jobToFinish);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToFinish);
        }

        public async Task DeleteJob(int jobID)
        {
            var jobToDelete = await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            dbcontext.Remove(jobToDelete);
            await dbcontext.SaveChangesAsync();
        }
    } 
}
