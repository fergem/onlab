using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class JobApplication
    {
        public bool IsApproved { get; set; }
        public IReadOnlyCollection<JobApplicationComment>? Comments { get; set; }

        public int ApplicantUserID { get; set; }

    }
}
