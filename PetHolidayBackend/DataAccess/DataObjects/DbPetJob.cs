using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbPetJob
    {
        public int JobID { get; set; }
        public virtual DbJob? Job { get; set; }
        public int PetID { get; set; }
        public virtual DbPet? Pet { get; set; }
    }
}
