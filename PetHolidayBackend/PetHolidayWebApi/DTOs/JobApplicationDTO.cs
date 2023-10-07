using Domain.Models;

namespace PetHolidayWebApi.DTOs
{
    public class JobApplicationDTO
    {
        public required int ID { get; set; }
        public required bool IsApproved { get; set; }
        public required IReadOnlyCollection<JobApplicationCommentDTO>? Comments { get; set; }
        public required UserPreviewDTO ApplicantUser { get; set; }
    }
}
