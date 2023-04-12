using DataAccess.DataObjects;
using Domain.Models;
using System;
using System.Collections.Generic;
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
            };
            var status = new Status()
            {
                ID = job.Status.ID,
                Name = job.Status.Name,
            };
            /*if (job.PetSitterUser != null)
            {
                var petSitter = new UserInformation()
                {
                    ID = job.PetSitterUser.Id,
                    UserName = job.PetSitterUser.UserName,
                    Email = job.PetSitterUser.Email,
                };
                return new Job()
                {
                    ID = job.ID,
                    Description = job.Description,
                    Hours = job.Hours,
                    Location = job.Location,
                    OwnerUserInformation = ownerUserInformation,
                    PetSitterUserInformation = petSitter,
                    Status = status,
                };
            }*/
            return new Job()
            {
                ID = job.ID,
                Description = job.Description,
                Hours = job.Hours,
                Location = job.Location,
                OwnerUserInformation = ownerUserInformation,
                Status = status,
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
            return new User()
            {
                ID = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                JobAdvertisements = jobAdvertisements,
                JobApplications = jobAplications,
                Pets = pets,
            };
        }
        internal static Pet ToPetModel(DbPet pet)
        {
            return new Pet{Name = pet.Name, Description = pet.Description, Species = pet.Species, Age = pet.Age, ID = pet.ID};
        }
    }
}
