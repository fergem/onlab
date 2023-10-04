using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Common.QueryHelpers;
using Domain.Models;

namespace Domain.Repositories
{
    public interface IPetRepository
    {
        Task<IReadOnlyCollection<Pet>> List(int userID, PetFilterParameters filter);
        Task<Pet> Insert(Pet pet, int userID);
        Task<Pet> Update(Pet pet);
        Task<Pet> AddImages(int ID, List<byte[]> files);
        Task Delete(int petID);
    }
}
