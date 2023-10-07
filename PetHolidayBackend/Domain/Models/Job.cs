using Domain.Common;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Job
    {
        public int ID { get; set; }
        public required string Location { get; set; }
        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }
        public required bool Repeated { get; set; }
        public required Status Status { get; set; }
        public required JobType Type { get; set; }

        public ICollection<DaysOfWeek>? Days { get; set; }
        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public required string Title { get; set; }

        public required int OwnerUserID { get; set; }
        public virtual User OwnerUser { get; set; } = null!;


        public virtual ICollection<PetJob> Pets { get; private set; } = new List<PetJob>();
        public virtual ICollection<JobApplication> JobApplications { get; private set; } = new List<JobApplication>();
    }
}
