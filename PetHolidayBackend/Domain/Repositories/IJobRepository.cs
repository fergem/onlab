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
        Task<PagedList<Job>> List(JobFilter jobParameters);
        Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobFilterPosted filter);


        Task<IReadOnlyCollection<Job>> ListAppliedJobs(int userID, JobApplicationFilter filter);

        Task<Job> FindById(int jobID);
        Task<Job> Insert(InsertJobModel job, int userID);
        Task<Job> ProgressJob(int jobID, Status status);
        Task CancelJobIfNotAvailable(int jobApplcationID);
        Task<Job> UpdateJob(int jobID);

        Task RemoveJobsDependentOnPet(int petID);
    }
}
