using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class PetJob
    {
        public int JobID { get; set; }
        public virtual Job Job { get; set; } = null!;
        public int PetID { get; set; }
        public virtual Pet Pet { get; set; } = null!;
    }
}
