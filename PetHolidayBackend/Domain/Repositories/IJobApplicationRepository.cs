using Domain.Common.QueryHelpers;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IJobApplicationRepository
    {
        Task<IReadOnlyCollection<JobApplication>> GetAllForJob(Job job);
        Task<IReadOnlyCollection<JobApplication>> GetAllForUser(int userID, JobFilterApplied filter);

        Task<JobApplication> GetById(int applicationID);
        Task<JobApplication> InsertApplicationForJob(int jobID, int userID);
        Task ApproveApplication(int applicationID);
        Task CancelApplication(int applicationID);

    }
}
