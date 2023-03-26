using Domain.Models;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class JobService
    {
        private readonly IJobRepository jobRepository;

        public JobService(IJobRepository jobRepository)
        {
            this.jobRepository = jobRepository;
        }
        public async Task<IReadOnlyCollection<Job>> List()
        {
            return await jobRepository.List();
        }
        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID)
        {
            return await jobRepository.ListPostedJobs(userID);
        }
        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {
            return await jobRepository.ListUnderTookJobs(userID);
        }
        public async Task<Job> Insert(Job Job)
        {
            return await jobRepository.Insert(Job);
        }
        public async Task<Job> Delete(int jobID)
        {
            return await jobRepository.Delete(jobID);
        }
    }
}
