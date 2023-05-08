using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
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

        public async Task<Job> Insert(Job job, int userID)
        {
            var ownerUser = await dbcontext.Users.FindAsync(userID);
            if (ownerUser == null)
                throw new Exception("User doesnt exists that wants to add a job");
            var availableStatus = await dbcontext.Statuses.FindAsync(1);
            if (availableStatus == null)
                throw new Exception("Available status doesnt exists");
            var insertJob = new DbJob()
            {
                Hours = job.Hours,
                Location = job.Location,
                Description = job.Description,
                OwnerUserID = ownerUser.Id,
                OwnerUser = ownerUser,
                StatusID = 1,
                Status = availableStatus,
                Payment = job.Payment,
            };


            await dbcontext.Jobs.AddAsync(insertJob);
            dbcontext.SaveChanges();

            return ModelMapper.ToJobModel(insertJob);
        }

        public async Task<IReadOnlyCollection<Job>> List(JobParameters jobParameters)
        {
            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Where(s => s.Hours >= jobParameters.MinHours && s.Hours <= jobParameters.MaxHours)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListAvailableJobs()
        {

            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Where(s => s.Status.Name == "Available")
                .Select(s => ModelMapper.ToJobModel(s)).ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID)
        {
            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Where(d => d.OwnerUserID == userID)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {

            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
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
                .FirstAsync(s => s.ID == jobID);

            if (jobToTake == null)
                throw new Exception("There is no such job that you want to undertake");

            var userToTakeJob = await dbcontext.Users.FindAsync(userID);
            if (userToTakeJob == null)
                throw new Exception("There is no such user to take job");

            jobToTake.PetSitterUser = userToTakeJob;

            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToTake);
        }
    } 
}
