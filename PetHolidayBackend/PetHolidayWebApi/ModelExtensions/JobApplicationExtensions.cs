using Domain.Models;
using PetHolidayWebApi.DTOs;
using PetHolidayWebApi.Hubs;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class JobApplicationExtensions
    {
        public static JobApplicationDTO ToJobApplicationDTO(this JobApplication jobApplication) =>
            new JobApplicationDTO
            {
                ID = jobApplication.ID,
                Status = jobApplication.Status.ToString(),
                Comments = jobApplication.Comments.Select(s => s.ToJobApplicationCommentDTO()).ToList(),
                ApplicantUser = jobApplication.ApplicantUser.ToUserDetailsDTO(),
            };

        public static JobApplicationCommentDTO ToJobApplicationCommentDTO(this JobApplicationComment jobApplicationComment) =>
            new JobApplicationCommentDTO
            {
                ID = jobApplicationComment.ID,
                CommentDate = jobApplicationComment.CommentDate,
                CommentText = jobApplicationComment.CommentText,
                SenderUserID = jobApplicationComment.SenderUserID,
            };
    }
}
