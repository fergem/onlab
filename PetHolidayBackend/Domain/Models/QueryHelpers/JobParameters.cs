using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.QueryHelpers
{
    public class JobParameters
    {
        public uint MinHours { get; set; }
        public uint MaxHours { get; set; } = 12;
        public StatusName? JobStatus { get; set; }
        public List<PetSpecies>? Species { get; set; }

        public bool ValidHoursRange => MaxHours > MinHours;

        public bool ValidJobStatus => JobStatus != null ? Enum.IsDefined(typeof(StatusName), JobStatus) : true;
    }
}
