using Domain.Models;

namespace PetHolidayWebApi.DTOs
{
    public class UserDetailsDTO
    {
        public required int ID { get; set; }
        public required string? FirstName { get; set; }
        public required string? LastName { get; set; }
        public required string? Email { get; set; }
        public required string? Location { get; set; }
        public required string? PhoneNumber { get; set; }
        public required byte[]? Picture { get; set; }
        public required OwnerProfileDTO? OwnerProfile { get; set; }
        public required PetSitterProfileDTO? PetSitterProfile { get; set; }
    }
}
