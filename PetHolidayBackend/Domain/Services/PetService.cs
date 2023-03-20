using Domain.Models;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class PetService
    {
        private readonly IPetRepository petRepository;

        public PetService(IPetRepository _petRepository)
        {
            petRepository = _petRepository;
        }

        public async Task<Pet> FindById(int petID)
        {
            return await petRepository.FindById(petID);
        }

        public async Task<Pet> Insert(Pet pet)
        {
            return await petRepository.Insert(pet);
        }
        public async Task<IReadOnlyCollection<Pet>>  List()
        {
            return await petRepository.List();
        }
    }
}
