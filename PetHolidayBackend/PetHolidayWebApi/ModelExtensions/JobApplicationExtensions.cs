﻿using Domain.Models;
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

        public static JobApplicationChatDTO ToJobApplicationUserAppliedToDTO(this JobApplication jobApplication) =>
           new JobApplicationChatDTO
           {
               ID = jobApplication.ID,
               JobTitle = jobApplication.Job.Title,
               StartDate = jobApplication.Job.StartDate,
               EndDate = jobApplication.Job.EndDate,
               Repeated = jobApplication.Job.Repeated,
               Type = jobApplication.Job.Type.ToString(),
               OwnerUser = jobApplication.Job.OwnerUser.ToUserPreviewDTO(),
               ApplicantUser = jobApplication.ApplicantUser.ToUserPreviewDTO(),
               DisplayPetPicture = jobApplication.Job.Pets.FirstOrDefault()?.Pet.Image,
               Comments = jobApplication.Comments.Select(s => s.ToJobApplicationCommentDTO()).ToList(),
           };

        public static PostedJobApplicationDTO ToPostedJobApplicationDTO(this JobApplication jobApplication) =>
            new PostedJobApplicationDTO
            {
                ID = jobApplication.ID,
                Status = jobApplication.Status.ToString(),
                ApplicantUser = jobApplication.ApplicantUser.ToUserDetailsDTO()
            };
    }
}