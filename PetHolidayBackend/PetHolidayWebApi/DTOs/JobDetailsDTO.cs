using Domain.Common;
using Domain.Models;

namespace PetHolidayWebApi.DTOs
{
    public class JobDetailsDTO
    {
        public required int ID { get; set; }
        public required string Location { get; set; }
        public required bool Repeated { get; set; }

        public required string Title { get; set; }
        public required string Type { get; set; }

        public required DateTime StartDate { get; set; }
        public required DateTime? EndDate { get; set; }

        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }

        public required UserPreviewDTO OwnerUser { get; set; }

        public required IReadOnlyCollection<PetDTO> Pets { get; set; }
        public required ICollection<string>? Days { get; set; }
    }
}
