using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Common.InsertModels;
using Domain.Common.QueryHelpers;
using Domain.Common.UpdateModels;
using Domain.Models;

namespace Domain.Repositories
{
    public interface IPetRepository
    {
        Task<Pet> FindById(int petID);
        Task<IReadOnlyCollection<Pet>> List(int userID);
        Task<Pet> Insert(InsertPetModel pet, byte[]? image, int userID);
        Task<Pet> Update(UpdatePetModel pet, byte[]? image);
        Task Delete(int petID);
    }
}
