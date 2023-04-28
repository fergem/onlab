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
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Species { get; set; }
        public int Age { get; set; }
        //public ICollection<PetImage>? Images { get; set; }
        public PetImage? Image { get; set; }
    }

    public class PetImage
    {
        public int ID { get; set; }
        public byte[]? Picture { get; set; }
    }
}
