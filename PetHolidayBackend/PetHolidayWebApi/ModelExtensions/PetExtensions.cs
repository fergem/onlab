using PetHolidayWebApi.DTOs;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class PetExtensions
    {
        public static PetDTO ToPetDTO(this Domain.Models.Pet pet) =>
            new PetDTO
            {
                ID = pet.ID,
                Name = pet.Name,
                Species = pet.Species,
                Age = pet.Age,
                Images = pet.Images,
            };
    }
}
