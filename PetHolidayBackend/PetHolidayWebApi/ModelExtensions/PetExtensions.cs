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
                Images = pet.Images.Select(s => s.ToPetImage()).ToList(),
            };

        public static PetDTO ToPetDTO(this PetJob petJob) =>
           new PetDTO
           {
               ID = petJob.Pet.ID,
               Name = petJob.Pet.Name,
               Species = petJob.Pet.Species,
               Age = petJob.Pet.Age,
               Images = petJob.Pet.Images.Select(s => s.ToPetImage()).ToList(),
           };

        public static byte[] ToPetImage(this PetImage petImage) =>
            petImage.Picture;
    }
}
