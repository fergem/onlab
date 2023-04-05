using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Status
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public Status(int ID, string Name)
        {
            this.ID = ID;
            this.Name = Name;
        }
    } 
}
