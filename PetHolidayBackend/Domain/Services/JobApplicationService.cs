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

        public JobApplicationService(IJobApplicationRepository jobApplicationRepository, IJobApplicationCommentRepository jobApplicationCommentRepository)
        {
            this.jobApplicationRepository = jobApplicationRepository;
            this.jobApplicationCommentRepository = jobApplicationCommentRepository;
        }

        public async Task<IReadOnlyCollection<JobApplication>> GetAllForJob(int jobID)
        {
            return await jobApplicationRepository.GetAllForJob(jobID);//.ConfigureAwait(false);
        }

        public async Task<JobApplication> InsertApplicationForJob(int jobID, int userID)
        {
            return await jobApplicationRepository.InsertApplicationForJob(jobID, userID);
        }
        public async Task DeleteApplication(int applicationID)
        {
            await jobApplicationRepository.DeleteApplication(applicationID);
        }
        public async Task ApproveApplication(int applicationID)
        {
            await jobApplicationRepository.ApproveApplication(applicationID);
        }

        public async Task<JobApplicationComment> InsertApplicationComment(string text, int userID)
        {
            return await jobApplicationCommentRepository.InsertApplicationComment(text, userID);
        }

        public async Task<JobApplicationComment> UpdateApplicationComment(string text, int userID)
        {
            return await jobApplicationCommentRepository.UpdateApplicationComment(text, userID);
        }
        public async Task DeleteApplicationComment(int commentID)
        {
            await jobApplicationCommentRepository.DeleteApplicationComment(commentID);
        }
    }
}
