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
        Task<IReadOnlyCollection<Pet>> List();
        Task<Pet> FindById(int petID);
        Task<User> FindUserById(int petID);
        Task<Pet> Insert(Pet pet);
        Task<Pet> Update(Pet pet);
        Task<Pet> Delete(int petID);
    }
}
