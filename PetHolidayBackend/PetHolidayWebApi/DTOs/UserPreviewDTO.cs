namespace PetHolidayWebApi.DTOs
{
    public class UserPreviewDTO
    {
        public required int ID { get; set; }
        public required string? FirstName { get; set; }
        public required string? LastName { get; set; }
        public required byte[]? Picture { get; set; }
    }
}
