using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbOwnerProfile
    {
        public int ID { get; set; }
        public string? Description { get; set; }

        public int MinRequiredExperience { get; set; }

        public int MinWage { get; set; }

        public string? Location { get; set; }

        public int UserID { get; set; }
        public virtual DbUser User { get; set; } = null!;
    }
}
