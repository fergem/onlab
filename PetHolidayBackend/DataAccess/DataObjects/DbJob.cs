using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbJob
    {
        public DbJob() {
            Pets = new HashSet<DbPetJob>();
           // Days = new HashSet<DbJobDay>();
        }
        public int ID { get; set; }
        public required string Location { get; set; }
        public required int Hours { get; set; }
        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }
        public required bool Repeated { get; set; }
        public required Status Status { get; set; }
        public required JobType Type { get; set; }

        public string? Days { get; set; }
        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public required string Title { get; set; }



        public required int OwnerUserID { get; set; }
        public virtual DbUser OwnerUser { get; set; } = null!;

        public int? PetSitterUserID { get; set; } = null;
        public virtual DbUser? PetSitterUser { get; set; } = null!;

        public virtual ICollection<DbPetJob> Pets { get; set; }
    }
}
