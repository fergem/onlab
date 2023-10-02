using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbJobApplication
    {
        public int ID { get; set; }
        public bool IsApproved { get; set; }

        public int JobID { get; set; }
        public virtual DbJob? Job { get; set; }
        public int ApplicantUserID { get; set; }
        public virtual DbUser? ApplicantUser { get; set; }


        public virtual ICollection<DbJobApplicationComment> Comments { get; set; } = new List<DbJobApplicationComment>();
    }
}
