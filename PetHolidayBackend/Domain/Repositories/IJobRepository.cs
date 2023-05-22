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
        Task<IReadOnlyCollection<Job>> List(JobParameters jobParameters);
        Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobParameters jobParameters);
        Task<IReadOnlyCollection<Job>> ListApprovals(int userID);
        Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID);
        Task<Job> FindById(int jobID);
        Task<Job> Insert(InsertJobModel job, int userID);
        Task<Job> TakeJob(int jobID, int userID);
        Task<Job> ApproveUser(int jobID);
        Task<Job> DeclineUser(int jobID);

    }
}
