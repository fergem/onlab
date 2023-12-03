using Domain.Common;
using Domain.Common.InsertModels;
using Domain.Common.QueryHelpers;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IJobRepository
    {
        Task<PagedList<Job>> List(JobFilter jobFilter);
        Task<PagedList<Job>> ListPostedJobs(int userID, JobFilterPosted filter);
        Task<PagedList<Job>> ListAppliedJobs(int userID, JobFilterApplied filter);
        Task<Job> FindById(int jobID);
        Task<Job> Insert(InsertJobModel job, int userID);
        Task<Job> ProgressJob(int jobID, Status status);
        Task CancelJobIfNotAvailable(int jobApplcationID);
        Task CancelJobsDependentOnPet(int petID);
    }
}
