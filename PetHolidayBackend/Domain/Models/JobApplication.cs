using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class JobApplication
    {
        public JobApplication() 
        {
            Comments = new HashSet<JobApplicationComment>();
        }
        public int ID { get; set; }
        public bool IsApproved { get; set; }

        public int JobID { get; set; }
        public virtual Job Job { get; set; } = null!; //ITT KI KELL VENNI EZT!!
        public int ApplicantUserID { get; set; }
        public virtual User ApplicantUser { get; set; } = null!; //ITT KI KELL VENNI EZT!!

        public virtual ICollection<JobApplicationComment> Comments { get; set; }
    }
}
