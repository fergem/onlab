using FluentValidation;
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
    public class RegisterModelModelValidator: AbstractValidator<RegisterModel>
    {
        public RegisterModelModelValidator()
        {
            RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required.")
            .Matches("^[a-zA-Z0-9_-]*$").WithMessage("Username can only contain letters, numbers, hyphens, and underscores.")
            .MinimumLength(6).WithMessage("Username must be at least 6 characters long.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
                .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
                .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter.")
                .Matches("[0-9]").WithMessage("Password must contain at least one digit.")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email address.");

            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First name is required.")
                .MaximumLength(50).WithMessage("First name cannot exceed 50 characters.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Last name is required.")
                .MaximumLength(50).WithMessage("Last name cannot exceed 50 characters.");

            RuleFor(x => x.IsOwner)
            .Must((model, isOwner) => isOwner || model.IsPetSitter)
            .WithMessage("At least one role should be true.");

            RuleFor(x => x.IsPetSitter)
                .Must((model, isPetSitter) => isPetSitter || model.IsOwner)
                .WithMessage("At least one role should be true.");
        }
    }
}
