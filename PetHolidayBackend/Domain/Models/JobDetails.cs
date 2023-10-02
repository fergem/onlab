using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class JobDetails
    {
        public int ID { get; set; }
        public required string Location { get; set; }
        public required bool Repeated { get; set; }

        public required string Title { get; set; }
        public required JobType Type { get; set; }

        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }

        public virtual ICollection<JobApplication>? JobApplications { get; set; }
        public required UserInformation OwnerUserInformation { get; set; }
        public UserInformation? PetSitterUserInformation { get; set; }

        public required IReadOnlyCollection<Pet> Pets { get; set; }
        public required ICollection<DaysOfWeek>? Days { get; set; }
    }
}
