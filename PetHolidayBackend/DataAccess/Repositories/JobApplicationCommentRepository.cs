using Domain.Models;
using Domain.Repositories;

namespace DataAccess.Repositories
{
    public class JobApplicationCommentRepository : IJobApplicationCommentRepository
    {

        private readonly PetHolidayDbContext dbcontext;

        public JobApplicationCommentRepository(PetHolidayDbContext dbcontext) 
        {
            this.dbcontext = dbcontext;
        }

        public async Task<JobApplicationComment> InsertApplicationComment(string message, int userID, JobApplication application)
        {

            var newComment = new JobApplicationComment()
            {
                CommentDate = DateTime.Now,
                SenderUserID = userID,
                JobApplication = application,
                CommentText = message,
            };

            await dbcontext.JobApplicationsComment.AddAsync(newComment);
            await dbcontext.SaveChangesAsync();

            return newComment;
        }

        public Task DeleteApplicationComment(int commentID)
        {
            throw new NotImplementedException();
        }
    }
}
