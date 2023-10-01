using DataAccess.DataObjects;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    internal static class ModelMapper
    {
        internal static Job ToJobModel(DbJob job)
        {
            var ownerUserInformation = new UserInformation()
            {
                UserName = job.OwnerUser.UserName ?? "",
                Picture = job.OwnerUser.Picture,
                FirstName = job.OwnerUser.FirstName ?? "",
                LastName = job.OwnerUser.LastName ?? "",
                Age = job.OwnerUser.Age,
                Email = job.OwnerUser.Email ?? "",
                Location = job.OwnerUser.Location ?? "",
                PhoneNumber = job.OwnerUser.PhoneNumber ?? ""
            };

            var pets = new List<Pet>();
            foreach (var petJob in job.Pets)
                if(petJob.Pet != null)
                    pets.Add(ToPetModel(petJob.Pet));

            if (job.PetSitterUser != null)
            {
                var petSitterInformation = new UserInformation()
                {
                    UserName = job.PetSitterUser.UserName ?? "",
                    Picture = job.PetSitterUser.Picture,
                    FirstName = job.PetSitterUser.FirstName ?? "",
                    LastName = job.PetSitterUser.LastName ?? "",
                    Age = job.PetSitterUser.Age,
                    Email = job.PetSitterUser.Email ?? "",
                    PhoneNumber = job.OwnerUser.PhoneNumber ?? ""
                };
                return new Job()
                {
                    ID = job.ID,
                    Description = job.Description,
                    Hours = job.Hours,
                    Location = job.Location,
                    OwnerUserInformation = ownerUserInformation,
                    Payment = job.Payment,
                    PetSitterUserInformation = petSitterInformation,
                    Status = job.Status,
                    MinRequiredExperience = job.MinRequiredExperience,
                    Pets = pets,
                    Repeated = job.Repeated,
                    StartDate = job.StartDate.ToUniversalTime(),
                    EndDate = job.EndDate,
                    Days = job.Days,
                    Title = job.Title,
                    Type = job.Type,
                };
            }
            return new Job()
            {
                ID = job.ID,
                Description = job.Description,
                Hours = job.Hours,
                Location = job.Location,
                Payment = job.Payment,
                OwnerUserInformation = ownerUserInformation,
                Status = job.Status,
                MinRequiredExperience = job.MinRequiredExperience,
                Pets = pets,
                Repeated = job.Repeated,
                StartDate = job.StartDate.ToUniversalTime(),
                EndDate = job.EndDate,
                Days = job.Days,
                Title = job.Title,
                Type = job.Type,
            };
        }
        internal static User ToUserModel(DbUser user)
        {
            var pets = new List<Pet>();
            foreach(var pet in user.Pets)
            {
                pets.Add(ToPetModel(pet));
            }
            var ownerProfile = new OwnerProfile();
            if (user.OwnerProfile != null)
            {
                ownerProfile = new OwnerProfile()
                {
                    ID = user.OwnerProfile.ID,
                    Description = user.OwnerProfile.Description ?? "",
                    MinRequiredExperience = user.OwnerProfile.MinRequiredExperience,
                    MinWage = user.OwnerProfile.MinWage,
                    UserID = user.OwnerProfile.UserID,
                };
            }
       
            return new User()
            {
                ID = user.Id,
                UserName = user.UserName ?? "",
                Email = user.Email ?? "",
                Pets = pets,
                Picture = user.Picture,
                Age = user.Age,
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? "",
                OwnerProfile = ownerProfile,
                PhoneNumber = user.PhoneNumber ?? "",
                Location = user.Location ?? "",
            };
        }
        internal static Pet ToPetModel(DbPet pet)
        {
            return new Pet{Name = pet.Name, Description = pet.Description, Species = pet.Species, Age = pet.Age, ID = pet.ID, Images = ToPetImagesModel(pet.Images.ToList())};
        }
        internal static List<byte[]>? ToPetImagesModel(List<DbPetImage>? images)
        {
            if (images == null)
                return null;
            var result = new List<byte[]>();

            foreach(var image in images)
            {
                if (image != null && image.Picture != null)
                {
                    result.Add(image.Picture);
                }
            }
            return result;
        }

        internal static UserInformation ToUserInformationModel(DbUser user)
        {
            return new UserInformation()
            {
                UserName = user.UserName ?? "",
                Picture = user.Picture,
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? "",
                Age = user.Age,
                Email = user.Email ?? "",
                Location = user.Location ?? "",
                PhoneNumber = user.PhoneNumber ?? ""
            };
        }
    }
}
