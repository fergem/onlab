using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.QueryHelpers
{
    public class JobApplicationFilter
    {
        public Status JobStatus { get; set; }
        public JobApplicationStatus ApplicationStatus { get; set; }
    }
}
