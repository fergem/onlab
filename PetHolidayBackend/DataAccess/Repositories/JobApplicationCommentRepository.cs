using Domain.Models;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class JobApplicationCommentRepository : IJobApplicationCommentRepository
    {
        public Task DeleteApplicationComment(int commentID)
        {
            throw new NotImplementedException();
        }

        public Task<JobApplicationComment> InsertApplicationComment(string text, int userID)
        {
            throw new NotImplementedException();
        }

        public Task<JobApplicationComment> UpdateApplicationComment(string text, int userID)
        {
            throw new NotImplementedException();
        }
    }
}
