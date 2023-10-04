namespace PetHolidayWebApi.DTOs
{
    public class PetSitterProfileDTO
    {
        public required int ID { get; set; }
        public required string? Description { get; set; }
        public required int AcquiredExperience { get; set; }
    }
}
