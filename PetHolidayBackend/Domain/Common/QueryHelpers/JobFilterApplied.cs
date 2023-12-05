using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.QueryHelpers
{
    public class JobFilterApplied
    {
        public Status Status { get; set; }
        public JobApplicationStatus JobApplicationStatus { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; } = 10;
    }
}
