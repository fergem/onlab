using DataAccess.DataObjects;
using Domain.Models;
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

        public async Task<Job> Insert(Job job)
        {
            var insertJob = new DbJob()
            {
                Hours = job.Hours,
                Location = job.Location,
                Description = job.Description,
                OwnerUserID = job.OwnerUserInformation.ID,
                StatusID = 1
            };

            await dbcontext.Jobs.AddAsync(insertJob);
            dbcontext.SaveChanges();

            return ModelMapper.ToJobModel(insertJob);
        }

        public async Task<IReadOnlyCollection<Job>> List()
        {
            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
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
    } 
}
