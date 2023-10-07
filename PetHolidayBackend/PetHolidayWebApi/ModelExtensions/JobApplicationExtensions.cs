using Domain.Models;
using PetHolidayWebApi.DTOs;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class JobApplicationExtensions
    {
        public static JobApplicationDTO ToJobApplicationDTO(this JobApplication jobApplication) =>
            new JobApplicationDTO
            {
                ID = jobApplication.ID,
                IsApproved = jobApplication.IsApproved,
                Comments = jobApplication.Comments.Select(s => s.ToJobApplicationCommentDTO()).ToList(),
                ApplicantUser = jobApplication.ApplicantUser.ToUserPreviewDTO(),
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
