using Domain.Common;
using Domain.Models;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.QueryHelpers
{
    public class JobFilter
    {
        public List<JobType>? Types { get; set; }
        public List<PetSpecies>? Species { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Repeated { get; set; }
        public ICollection<DaysOfWeek>? Days { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; } = 20;
       
    }
}
