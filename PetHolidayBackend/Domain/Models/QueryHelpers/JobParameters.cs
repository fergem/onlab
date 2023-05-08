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

        public bool ValidHoursRange => MaxHours > MinHours;
    }
}
