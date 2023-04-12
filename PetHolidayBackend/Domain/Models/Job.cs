using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Job
    {
        public required int ID { get; set; }
        public required string Location { get; set; }
        public required int Hours { get; set; }
        public required string Description { get; set; }
        public UserInformation? OwnerUserInformation { get; set; }
        //public UserInformation? PetSitterUserInformation { get; set; }
        public required Status Status { get; set; }
    }
}
