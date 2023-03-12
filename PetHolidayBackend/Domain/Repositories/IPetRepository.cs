using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;

namespace Domain.Repositories
{
    public interface IPetRepository
    {
        ICollection<Pet> GetAll();
        Pet FindById(int petID);
        Pet Insert(Pet pet);
        Pet Update(Pet pet);
        Pet Delete(int petID);
    }
}
