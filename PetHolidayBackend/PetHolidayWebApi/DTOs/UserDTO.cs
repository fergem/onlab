namespace PetHolidayWebApi.DTOs
{
    public class UserDTO
    {
        public required int ID { get; set; }
        public required string? UserName { get; set; }
        public required string? Bearer { get; set; }
        public required List<string>? Role { get; set; }
    }
}
