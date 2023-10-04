﻿using System.ComponentModel.DataAnnotations;

namespace Domain.Common.AuthHelpers
{
    public class LoginModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
