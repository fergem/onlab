using Domain.Common;
using Domain.Common.InsertModels;
using Domain.Common.QueryHelpers;
using Domain.Models;
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

        public JobService(IJobRepository jobRepository)
        {
            this.jobRepository = jobRepository;
        }
        public async Task<IReadOnlyCollection<Job>> List(JobFilter jobParameters) => await jobRepository.List(jobParameters);
        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobFilterPosted filter) => await jobRepository.ListPostedJobs(userID, filter);
        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID, JobApplicationFilter filter) => await jobRepository.ListUnderTookJobs(userID, filter);
        public async Task<Job> Insert(InsertJobModel job, int userID) => await jobRepository.Insert(job, userID);
        public async Task<Job> FindById(int jobID) => await jobRepository.FindById(jobID);
        public async Task<Job> FinishJob(int jobID) => await jobRepository.ProgressJob(jobID, Status.Done);
        public async Task<Job> CancelJob(int jobID) => await jobRepository.ProgressJob(jobID, Status.Canceled);
    }
}
