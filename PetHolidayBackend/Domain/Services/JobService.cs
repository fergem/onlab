using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
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
        private readonly IStatusRepository statusRepository;

        public JobService(IJobRepository jobRepository, IStatusRepository statusRepository)
        {
            this.jobRepository = jobRepository;
            this.statusRepository = statusRepository;
        }
        public async Task<IReadOnlyCollection<Job>> List(JobParameters jobParameters)
        {
            return await jobRepository.List(jobParameters);
        }
        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobParameters jobParameters)
        {
            return await jobRepository.ListPostedJobs(userID, jobParameters);
        }
        public async Task<IReadOnlyCollection<Job>> ListApprovals(int userID)
        {
            return await jobRepository.ListApprovals(userID);
        }
        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {
            return await jobRepository.ListUnderTookJobs(userID);
        }
        public async Task<int> Insert(InsertJobModel job, int userID)
        {
            return await jobRepository.Insert(job, userID);
        }
      
        public async Task<Job> FindById(int jobID)
        {
            return await jobRepository.FindById(jobID);
        }

        public async Task<Status> FindStatusByName(StatusName name)
        {
            return await statusRepository.FindByName(name);
        }

        public async Task<Job> TakeJob(int jobID, int userID)
        {
            return await jobRepository.TakeJob(jobID, userID);
        }

        public async Task<Job> ApproveUser(int jobID)
        {
            return await jobRepository.ApproveUser(jobID);
        }
        public async Task<Job> DeclineUser(int jobID)
        {
            return await jobRepository.DeclineUser(jobID);
        }
        public async Task<Job> FinishJob(int jobID)
        {
            return await jobRepository.FinishJob(jobID);
        }
        public async Task DeleteJob(int jobID)
        {
            await jobRepository.DeleteJob(jobID);
        }
    }
}
