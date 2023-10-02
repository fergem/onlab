using Domain.Common.InsertModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IJobApplicationCommentRepository
    {
        Task InsertApplicationComment(string text, int userID);
        Task UpdateApplicationComment(string text, int userID);
        Task DeleteApplicationComment(int commentID);
    }
}
