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
                ID = job.OwnerUser.Id,
                UserName = job.OwnerUser.UserName,
                Picture = job.OwnerUser.Picture,
                FirstName = job.OwnerUser.FirstName,
                LastName = job.OwnerUser.LastName,
                Age = job.OwnerUser.Age,
                Email = job.OwnerUser.Email,
            };
            var status = ToStatusModel(job.Status);
            if (status == null)
                throw new Exception("Status doesnt exist");

            var pets = new List<Pet>();
            foreach (var petJob in job.Pets)
                if(petJob.Pet != null)
                    pets.Add(ToPetModel(petJob.Pet));

            if (job.PetSitterUser != null)
            {
                var petSitterInformation = new UserInformation()
                {
                    ID = job.PetSitterUser.Id,
                    UserName = job.PetSitterUser.UserName,
                    Picture = job.PetSitterUser.Picture,
                    FirstName = job.PetSitterUser.FirstName,
                    LastName = job.PetSitterUser.LastName,
                    Age = job.PetSitterUser.Age,
                    Email = job.PetSitterUser.Email,
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
                    Status = status,
                    MinRequiredExperience = job.MinRequiredExperience,
                    Pets = pets,
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
                Status = status,
                MinRequiredExperience = job.MinRequiredExperience,
                Pets = pets,
            };
        }
        internal static User ToUserModel(DbUser user)
        {
            var jobAdvertisements = new List<Job>();
            foreach (var jobAds in user.JobAdvertisements)
            {
                jobAdvertisements.Add(ToJobModel(jobAds));
            }
            var jobAplications = new List<Job>();
            foreach(var jobApl in user.JobApplications)
            {
                jobAplications.Add(ToJobModel(jobApl));
            }
            var pets = new List<Pet>();
            foreach(var pet in user.Pets)
            {
                pets.Add(ToPetModel(pet));
            }
            if(user.OwnerProfile != null)
            {
                var ownerProfile = new OwnerProfile()
                {
                    ID = user.OwnerProfile.ID,
                    Description = user.OwnerProfile.Description,
                    MinRequiredExperience = user.OwnerProfile.MinRequiredExperience,
                    MinWage = user.OwnerProfile.MinWage,
                    UserID = user.OwnerProfile.UserID,
                };
                return new User()
                {
                    ID = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    JobAdvertisements = jobAdvertisements,
                    JobApplications = jobAplications,
                    Pets = pets,
                    Picture = user.Picture,
                    Age = user.Age,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    OwnerProfile = ownerProfile,
                };
            }
           
            return new User()
            {
                ID = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                JobAdvertisements = jobAdvertisements,
                JobApplications = jobAplications,
                Pets = pets,
                Picture = user.Picture,
                Age = user.Age,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }
        internal static Pet ToPetModel(DbPet pet)
        {
            //var images = new List<PetImage>();
            //foreach (var image in pet.Images)
                //images.Add(ToPetImageModel(image));

            return new Pet{Name = pet.Name, Description = pet.Description, Species = pet.Species, Age = pet.Age, ID = pet.ID, Image = ToPetImageModel(pet.Image)};
        }
        internal static PetImage? ToPetImageModel(DbPetImage image)
        {
            if (image == null)
                return null;
            return new PetImage()
            {
                ID = image.ID,
                Picture = image.Picture,
            };
        }

        internal static Status ToStatusModel(DbStatus status)
        {
            return new Status() { ID = status.ID, Name = (StatusName)Enum.Parse(typeof(StatusName), status.Name.ToString()) };
        }
    }
}
