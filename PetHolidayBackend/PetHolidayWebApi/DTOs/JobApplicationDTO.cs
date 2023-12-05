using Domain.Models;

namespace PetHolidayWebApi.DTOs
{
    public class JobApplicationDTO
    {
        public required int ID { get; set; }
        public required string Status { get; set; }
        public required IReadOnlyCollection<JobApplicationCommentDTO>? Comments { get; set; }
        public required UserDetailsDTO ApplicantUser { get; set; }
    }
}
