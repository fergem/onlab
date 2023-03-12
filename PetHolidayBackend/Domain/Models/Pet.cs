using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Pet
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Species { get; set; }

        public int Age { get; set; }
        public Pet(int ID, string Name, string Description, string Species, int Age)
        {
            this.ID = ID;
            this.Name = Name;
            this.Description = Description;
            this.Species = Species;
            this.Age = Age;
        }
    }
}
