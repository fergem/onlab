using Domain.Common;

namespace PetHolidayWebApi.DTOs
{
    public class PostedJobDTO
    {
        public required int ID { get; set; }
        public required string Title { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime? EndDate { get; set; }
        public required string Type { get; set; }
        public required string Status { get; set; }
        public required string Description { get; set; }
        
        public required ICollection<string>? Days { get; set; }

        public required IReadOnlyCollection<PostedJobApplicationDTO> JobApplications {  get; set; } 
    }
}
