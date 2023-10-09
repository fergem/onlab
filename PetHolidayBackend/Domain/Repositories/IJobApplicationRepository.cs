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
        Task<JobApplication> GetById(int applicationID);
        Task<JobApplication> InsertApplicationForJob(int jobID, int userID);
        Task CancelApplication(int applicationID);
        Task ApproveApplication(int applicationID);
    }
}
