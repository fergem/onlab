using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.InsertModels
{
    public class InsertPetModel
    {
        public required string Name { get; set; }
        public required PetSpecies Species { get; set; }
        public required int Age { get; set; }
    }
}
