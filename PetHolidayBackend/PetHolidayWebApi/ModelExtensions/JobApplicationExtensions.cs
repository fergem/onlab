using PetHolidayWebApi.DTOs;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class JobApplicationExtensions
    {
        public static JobApplicationDTO ToJobApplicationDTO(this Domain.Models.JobApplication jobApplication) =>
            new JobApplicationDTO
            {
                ID = jobApplication.ID,
                IsApproved = jobApplication.IsApproved,
                Comments = jobApplication.Comments,
                ApplicantUser = jobApplication.ApplicantUser.ToUserPreviewDTO(),
            };
    }
}
