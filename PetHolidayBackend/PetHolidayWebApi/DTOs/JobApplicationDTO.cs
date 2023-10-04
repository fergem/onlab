using Domain.Models;

namespace PetHolidayWebApi.DTOs
{
    public class JobApplicationDTO
    {
        public required int ID { get; set; }
        public required bool IsApproved { get; set; }
        public required IReadOnlyCollection<JobApplicationComment>? Comments { get; set; }
        public required int ApplicantUserID { get; set; }
    }
}
