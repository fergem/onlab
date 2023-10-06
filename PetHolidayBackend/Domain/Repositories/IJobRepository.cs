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
        Task<IReadOnlyCollection<Job>> List(JobFilter jobParameters);
        Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobFilterParticipant filter);
        Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID, JobFilterParticipant filter);
        Task<Job> FindById(int jobID);
        Task<int> Insert(InsertJobModel job, int userID);
        Task<Job> UpdateJob(int jobID);
    
        Task<Job> FinishJob(int jobID);
        Task DeleteJob(int jobID);
        Task RemoveJobsDependentOnPet(int petID);
    }
}
