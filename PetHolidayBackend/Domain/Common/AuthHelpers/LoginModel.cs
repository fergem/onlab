using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace Domain.Common.AuthHelpers
{
    public class LoginModel
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
    public class LoginModelModelValidator: AbstractValidator<LoginModel>
    {
        public LoginModelModelValidator()
        {
            RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long.");
        }
    }
}
