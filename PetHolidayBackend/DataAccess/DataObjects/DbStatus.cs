using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbStatus
    {
        public DbStatus() 
        {
            this.Jobs = new HashSet<DbJob>();
        }
        public int ID { get; set; }
        public required DbStatusName Name { get; set; }

        public virtual ICollection<DbJob> Jobs { get; set; }
    }

    public enum DbStatusName
    {
        Empty,
        Available,
        WaitingForApproval,
        Inprogress,
        Done,
    }
}
