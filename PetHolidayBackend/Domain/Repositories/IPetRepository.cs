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
        Task<Pet> Insert(InsertPetModel pet, int userID);
        Task<Pet> InsertImages(int ID, UpdatePetImagesModel addPetImagesModel);
        Task<Pet> Update(UpdatePetModel pet);
        Task Delete(int petID);
    }
}
