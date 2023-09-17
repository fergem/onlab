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
        public uint MinHours { get; set; }
        public uint MaxHours { get; set; } = 12;
        public List<PetSpecies>? Species { get; set; }

        public bool ValidHoursRange => MaxHours > MinHours;

    }
}
