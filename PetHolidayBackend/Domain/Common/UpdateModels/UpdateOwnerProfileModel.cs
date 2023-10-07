using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.UpdateModels
{
    public class UpdateOwnerProfileModel
    {
        public string? Description { get; set; }
        public int MinRequiredExperience { get; set; }
        public int MinWage { get; set; }
    }
}
