using Domain.Common;

namespace PetHolidayWebApi.DTOs
{
    public class JobPreviewDTO
    {
        public required int ID { get; set; }
        public required string Location { get; set; }
        public required string Title { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime? EndDate { get; set; }
        public required string Type { get; set; }
        public required ICollection<string>? Days { get; set; }
        public required int CatCount { get; set; }
        public required int DogCount { get; set; }
        public required byte[]? OwnerUserPicture { get; set; }
        public required bool IsRepeated { get; set; }
        public required byte[]? DisplayPetPicture { get; set; }
    }
}
