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

        public Task InsertApplicationComment(string text, int userID)
        {
            throw new NotImplementedException();
        }

        public Task UpdateApplicationComment(string text, int userID)
        {
            throw new NotImplementedException();
        }
    }
}
