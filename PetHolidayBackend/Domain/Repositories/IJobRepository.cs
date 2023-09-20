using Domain.Models;
using Domain.Models.QueryHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IJobRepository
    {
        Task<IReadOnlyCollection<Job>> List(JobFilter jobParameters);
        Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobFilter filter);
        Task<IReadOnlyCollection<Job>> ListApprovals(int userID);
        Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID);
        Task<Job> FindById(int jobID);
        Task<int> Insert(InsertJobModel job, int userID);
        Task<Job> UpdateJob(int jobID);
        Task<Job> TakeJob(int jobID, int userID);
        Task<Job> ApproveUser(int jobID);
        Task<Job> DeclineUser(int jobID);
        Task<Job> FinishJob(int jobID);
        Task DeleteJob(int jobID);

    }
}
