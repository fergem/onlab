using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbPetSitterProfile
    {
        public int ID { get; set; }
        public string? Description { get; set; }
        public int AcquiredExperience { get; set; }
        
        public int UserID { get; set; }
        public virtual DbUser User { get; set; } = null!;
    }
}
