﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IJobRepository
    {
        Task<IReadOnlyCollection<Job>> List();
        Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID);
        Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID);
        Task<Job> FindById(int jobID);
        Task<Job> Insert(Job job);
        Task<Job> Delete(int jobID);
    }
}