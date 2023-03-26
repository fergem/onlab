using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbJob
    {
        public int ID { get; set; }
        public string? Location { get; set; }
        public int Hours { get; set; }
        public string? Description { get; set; }
        public int? StatusID { get; set; }
        public virtual DbStatus? Status { get; set; }

        public string? OwnerUserID { get; set; }
        public virtual DbUser? OwnerUser { get; set; }

        public string? PetSitterUserID { get; set; }
        public virtual DbUser? PetSitterUser { get; set; }
    }
}
