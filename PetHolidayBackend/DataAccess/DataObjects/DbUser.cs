using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbUser : IdentityUser
    {
        public DbUser() 
        {
            this.Pets = new HashSet<DbPet>();
            this.JobAdvertisements = new HashSet<DbJob>();
            this.JobApplications = new HashSet<DbJob>();
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public byte[] Picture { get; set; }

        public int OwnerProfileID { get; set; }
        public virtual DbOwnerProfile? OwnerProfile { get; set; }
        public int PetSitterProfileID { get; set; }
        public virtual DbPetSitterProfile? PetSitterProfile { get;  set; }

        public virtual ICollection<DbPet> Pets { get; set; }

        public virtual ICollection<DbJob> JobAdvertisements { get; set; }
        public virtual ICollection<DbJob> JobApplications { get; set; }
    }
}
