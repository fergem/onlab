using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.QueryHelpers;

namespace Domain.Repositories
{
    public interface IPetRepository
    {
        Task<IReadOnlyCollection<Pet>> List(int userID, PetFilterParameters filter);
        Task<Pet> FindById(int petID);
        Task<int> Insert(Pet pet, int userID);
        Task<Pet> Update(Pet pet);
        Task<Pet> AddImage(int ID, byte[] file);
        Task Delete(int petID);
    }
}
