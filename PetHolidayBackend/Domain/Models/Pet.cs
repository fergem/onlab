using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Pet
    {
        public int ID { get; set; }
        public required string Name { get; set; }
        public required PetSpecies Species { get; set; }
        public int Age { get; set; }
        public List<byte[]>? Images { get; set; }
    }
}
