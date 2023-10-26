﻿using Domain.Common;
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
        Task<IReadOnlyCollection<Job>> ListRepeatablePostedJobs(int userID, JobFilterParticipant filter);
        Task<IReadOnlyCollection<Job>> ListNonRepeatablePostedJobs(int userID, JobFilterParticipant filter);

        Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID, JobFilterParticipant filter);

        Task<Job> FindById(int jobID);
        Task<Job> Insert(InsertJobModel job, int userID);
        Task<Job> ProgressJob(int jobID, Status status);
        Task<Job> UpdateJob(int jobID);

        Task RemoveJobsDependentOnPet(int petID);
    }
}
