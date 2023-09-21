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
        public required string Description { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required PetSpecies Species { get; set; }
        public int Age { get; set; }
        //public ICollection<PetImage>? Images { get; set; }
        public List<byte[]>? Images { get; set; }
    }
}
