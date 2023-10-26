using Domain.Common.InsertModels;
using Domain.Common.QueryHelpers;
using Domain.Models;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class JobApplicationService
    {
        public IJobApplicationRepository jobApplicationRepository { get; set; }
        public IJobApplicationCommentRepository jobApplicationCommentRepository { get; set; }
        public IJobRepository jobRepository { get; set; }

        public JobApplicationService(IJobApplicationRepository jobApplicationRepository, IJobApplicationCommentRepository jobApplicationCommentRepository, IJobRepository jobRepository)
        {
            this.jobApplicationRepository = jobApplicationRepository;
            this.jobApplicationCommentRepository = jobApplicationCommentRepository;
            this.jobRepository = jobRepository;
        }

        public async Task<IReadOnlyCollection<JobApplication>> GetAllForJob(int jobID)
        {
            var job = await jobRepository.FindById(jobID);
            return await jobApplicationRepository.GetAllForJob(job);
        }
        public async Task<IReadOnlyCollection<JobApplication>> GetAllForUser(int userID, JobApplicationFilter filter) => await jobApplicationRepository.GetAllForUser(userID, filter);
        public async Task<JobApplication> InsertApplicationForJob(int jobID, int userID) =>
            await jobApplicationRepository.InsertApplicationForJob(jobID, userID);
        public async Task DeleteApplication(int applicationID) => await jobApplicationRepository.CancelApplication(applicationID);
        public async Task ApproveApplication(int applicationID) => await jobApplicationRepository.ApproveApplication(applicationID);
        public async Task<JobApplicationComment> InsertApplicationComment(InsertJobApplicationCommentModel model, int userID) 
        {
            var application = await jobApplicationRepository.GetById(model.ApplicationID);
            return await jobApplicationCommentRepository.InsertApplicationComment(model.Message, userID, application); 
        }
        public async Task DeleteApplicationComment(int commentID) => await jobApplicationCommentRepository.DeleteApplicationComment(commentID);
    }
}
