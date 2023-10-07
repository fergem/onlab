using System.ComponentModel.DataAnnotations;

namespace Domain.Common.AuthHelpers
{
    public class LoginModel
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
