using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Job
    {
        public int ID { get; set; }
        public string Location { get; set; }
        public int Hours { get; set; }
        public string Description { get; set; }
        public int OwnerUserID { get; set; }
        public int? PetSitterUserID { get; set; }
        public int StatusID { get; set; }
        public Job(int ID, int Hours, string Description, string Location, int StatusID)
        {
            this.ID = ID;
            this.Description = Description;
            this.Hours = Hours;
            this.Location = Location;
            this.StatusID = StatusID;
        }
    }
}
