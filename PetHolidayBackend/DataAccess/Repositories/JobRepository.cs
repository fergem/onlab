using DataAccess.DataObjects;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

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
            return ToModel(job);
        }

        public async Task<Job> Insert(Job job)
        {
            var insertJob = new DbJob()
            {
                Hours = job.Hours,
                Location = job.Location,
                Description = job.Description,
                OwnerUserID = job.OwnerUserID,
                StatusID = 1
            };

            await dbcontext.Jobs.AddAsync(insertJob);
            dbcontext.SaveChanges();

            return ToModel(insertJob);
        }

        public async Task<IReadOnlyCollection<Job>> List()
        {
            return await dbcontext.Jobs.Select(s => ToModel(s)).ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListAvailableJobs()
        {

            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Where(s => s.Status.Name == "Available")
                .Select(s => ToModel(s)).ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID)
        {
            return await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Where(d => d.OwnerUserID == userID)
                .Select(s => ToModel(s))
                .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {
           
            return await dbcontext.Jobs
                .Include(s => s.PetSitterUser)
                .Where(d => d.PetSitterUserID == userID)
                .Select(s => ToModel(s))
                .ToListAsync();
        }

        public static Job ToModel(DbJob job)
        {
            return new Job(job.ID, job.Hours, job.Description, job.Location, job.StatusID);
        }
    }
}
