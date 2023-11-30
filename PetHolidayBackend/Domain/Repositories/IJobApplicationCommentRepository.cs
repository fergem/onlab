using Domain.Common.InsertModels;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IJobApplicationCommentRepository
    {
        Task<JobApplicationComment> InsertApplicationComment(string message, int userID, JobApplication application);
    }
}
