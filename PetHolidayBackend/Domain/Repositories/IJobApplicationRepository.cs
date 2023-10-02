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
        Task<JobApplication> InsertApplicationForJob(int jobID, int userID);
        Task DeleteApplication(int jobID, int userID);
        Task ApproveApplication(int applicationID);
    }
}
