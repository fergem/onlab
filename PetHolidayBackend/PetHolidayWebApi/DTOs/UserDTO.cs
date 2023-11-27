namespace PetHolidayWebApi.DTOs
{
    public class UserDTO
    {
        public required int ID { get; set; }
        public required string? UserName { get; set; }
        public required string? AccessToken { get; set; }
        public required string? RefreshToken { get; set; }
        public required List<string>? Roles { get; set; }
        public required byte[]? Picture { get; set; }
    }
}
