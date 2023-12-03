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
        private readonly IJobApplicationRepository jobApplicationRepository;


        public JobService(IJobRepository jobRepository, IJobApplicationRepository jobApplicationRepository)
        {
            this.jobRepository = jobRepository;
            this.jobApplicationRepository = jobApplicationRepository;
        }
        public async Task<PagedList<Job>> List(JobFilter jobFilter) => await jobRepository.List(jobFilter);
        public async Task<PagedList<Job>> ListPostedJobs(int userID, JobFilterPosted filter) => await jobRepository.ListPostedJobs(userID, filter);
        public async Task<PagedList<Job>> ListAppliedJobs(int userID, JobFilterApplied filter) => await jobRepository.ListAppliedJobs(userID, filter);
        public async Task<Job> Insert(InsertJobModel job, int userID) => await jobRepository.Insert(job, userID);
        public async Task<Job> FindById(int jobID) => await jobRepository.FindById(jobID);
        public async Task<Job> FinishJob(int jobID) => await jobRepository.ProgressJob(jobID, Status.Done);
        public async Task<Job> CancelJob(int jobID) {
            var canceledJob = await jobRepository.ProgressJob(jobID, Status.Canceled);
            foreach(var application in canceledJob.JobApplications)
            {
                await jobApplicationRepository.CancelApplication(application.ID);
            }
            return canceledJob;
        } 
    }
}
