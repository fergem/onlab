using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class PetSitterProfile
    {
        public int ID { get; set; }
        public string? Description { get; set; }
        public int AcquiredExperience { get; set; }
        
        public int UserID { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
