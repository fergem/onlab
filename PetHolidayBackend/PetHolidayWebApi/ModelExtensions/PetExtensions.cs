using Domain.Models;
using PetHolidayWebApi.DTOs;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class PetExtensions
    {
        public static PetDTO ToPetDTO(this Pet pet) =>
            new PetDTO
            {
                ID = pet.ID,
                Name = pet.Name,
                Species = pet.Species,
                Age = pet.Age,
                Image = pet.Image,
            };

        public static PetDTO ToPetDTO(this PetJob petJob) =>
           new PetDTO
           {
               ID = petJob.Pet.ID,
               Name = petJob.Pet.Name,
               Species = petJob.Pet.Species,
               Age = petJob.Pet.Age,
               Image = petJob.Pet.Image,
           };
    }
}
