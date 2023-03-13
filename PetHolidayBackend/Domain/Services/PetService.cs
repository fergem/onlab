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

        public Pet FindById(int petID)
        {
            return petRepository.FindById(petID);
        }

        public Pet Insert(Pet pet)
        {
            return petRepository.Insert(pet);
        }
        public IReadOnlyCollection<Pet> List()
        {
            return petRepository.List();
        }
    }
}
