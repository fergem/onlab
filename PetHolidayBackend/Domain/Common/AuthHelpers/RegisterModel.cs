using System.ComponentModel.DataAnnotations;

namespace Domain.Common.AuthHelpers
{
    public class RegisterModel
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required bool IsOwner { get; set; }
        public required bool IsPetSitter { get; set; }
    }
}
