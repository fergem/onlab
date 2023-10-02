using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class User
    {
        public required int ID { get; set; }
        public required string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Email { get; set; }
        public int? Age { get; set; }
        public byte[]? Picture { get; set; }
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }

        public string? Bearer { get; set; }

        public virtual OwnerProfile OwnerProfile { get; set; } = null!;

        public required ICollection<Pet> Pets { get; set; }
    }

    public class UserInformation
    {
        public required int ID { get; set; }
        public required string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Email { get; set; }
        public int? Age { get; set; }
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public byte[]? Picture { get; set; }
    }
}
