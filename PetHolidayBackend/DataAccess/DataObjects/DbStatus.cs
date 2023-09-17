using Domain.Models;
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
        public required Status Name { get; set; }

        public virtual ICollection<DbJob> Jobs { get; set; }
    }
}
 