using DataAccess.DataObjects;
using Domain.Common.InsertModels;
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

        private readonly PetHolidayDbContext dbcontext;

        public JobApplicationCommentRepository(PetHolidayDbContext dbcontext) 
        {
            this.dbcontext = dbcontext;
        }

        public async Task<JobApplicationComment> InsertApplicationComment(string message, int userID, int applicationID)
        {

            var newComment = new DbJobApplicationComment()
            {
                CommentDate = DateTime.Now,
                SenderUserID = userID,
                JobApplicationID = applicationID,
                CommentText = message,
            };

            await dbcontext.JobApplicationsComment.AddAsync(newComment);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobApplicationCommentModel(newComment);
        }

        public Task DeleteApplicationComment(int commentID)
        {
            throw new NotImplementedException();
        }
    }
}
