using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbUser : IdentityUser<int>
    {
        public DbUser() 
        {
            Pets = new HashSet<DbPet>();
            JobAdvertisements = new HashSet<DbJob>();
            JobApplications = new HashSet<DbJob>();
        }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Password { get; set; }
        public int Age { get; set; }
        public byte[]? Picture { get; set; }
        //public required bool FirstLogin { get; set; }
        
        public virtual DbOwnerProfile OwnerProfile { get; set; } = null!;

        public virtual DbPetSitterProfile PetSitterProfile { get; set; } = null!;
        
        public virtual ICollection<DbPet> Pets { get; set; }
        public virtual ICollection<DbJob> JobAdvertisements { get; set; }
        public virtual ICollection<DbJob> JobApplications { get; set; }
    }
}
