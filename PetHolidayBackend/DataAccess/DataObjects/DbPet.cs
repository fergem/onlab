using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbPet
    {
        public int ID { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Species { get; set; }

        public int Age { get; set; }

        public int UserId { get; set; }
        public virtual DbUser User { get; set; }
    }
}
