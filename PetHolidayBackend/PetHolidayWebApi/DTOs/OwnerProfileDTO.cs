namespace PetHolidayWebApi.DTOs
{
    public class OwnerProfileDTO
    {
        public required int ID { get; set; }
        public required string? Description { get; set; }
        public required int MinRequiredExperience { get; set; }
        public required int MinWage { get; set; }
    }
}
