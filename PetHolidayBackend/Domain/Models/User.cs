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
        public required ICollection<Pet> Pets { get; set; }
        public required ICollection<Job> JobAdvertisements { get; set; }
        public required ICollection<Job> JobApplications { get; set; }
    }

    public class UserInformation
    {
        public required int ID { get; set; }
        public required string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Email { get; set; }
        public int? Age { get; set; }
        public byte[]? Picture { get; set; }
    }
}
