﻿using Domain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Domain.Services
{
    public class AuthService
    {
        private readonly IConfiguration configuration;
        public AuthService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GenerateToken(User user, IList<string> userRoles)
        {
            var authClaims = new List<Claim> {
                new Claim("Id", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration["JsonWebTokenKeys:IssuerSigningKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                Expires = DateTime.Now.AddHours(3),
                Issuer = configuration["JsonWebTokenKeys:ValidIssuer"],
                Audience = configuration["JsonWebTokenKeys:ValidAudience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
