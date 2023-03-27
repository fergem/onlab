using DataAccess.DataObjects;
using Domain.Models;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly PetHolidayDbContext dbcontext;
        public JobRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<IReadOnlyCollection<Job>> ListJobs()
        {
            throw new NotImplementedException();
        }

        public async Task<Job> FindById(int jobID)
        {
            var q = from p in dbcontext.Jobs
                    where p.ID == jobID
                    select p;

            var foundJob = q.FirstOrDefault();
            if (foundJob.Equals(null))
            {
                return null;
            }
            return ToModel(foundJob);
        }

        public async Task<Job> Delete(int jobID)
        {
            throw new NotImplementedException();
        }

        public async Task<Job> Insert(Job job)
        {
            var insertJob = new DbJob()
            {
                Hours = job.Hours,
                Location = job.Location,
                Description = job.Description,
            };

            dbcontext.Jobs.Add(insertJob);
            dbcontext.SaveChanges();

            return ToModel(insertJob);
        }

        public async Task<IReadOnlyCollection<Job>> List()
        {
            return dbcontext.Jobs.Select(ToModel).ToList();
        }

        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {
            throw new NotImplementedException();
        }

        public Job ToModel(DbJob job)
        {
            return new Job(job.ID, job.Hours, job.Description, job.Location);
        }
    }
}
