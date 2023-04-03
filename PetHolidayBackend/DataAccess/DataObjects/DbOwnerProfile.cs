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

        public string? RequiredExperience { get; set; }

        public string? MinWage { get; set; }

        public int UserID { get; set; }
        public virtual DbUser User { get; set; }
    }
}
