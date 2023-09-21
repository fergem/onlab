using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.QueryHelpers
{
    public class JobFilter
    {
        public JobType Type { get; set; }
        public List<PetSpecies>? Species { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public bool Repeated { get; set; }

        public ICollection<DaysOfWeek>? Days { get; set; }

        public bool ValidRepeated => (Type == JobType.Visit || Type == JobType.Walking) && EndDate is null;

        public bool ValidOnce => EndDate is not null;
    }
}
