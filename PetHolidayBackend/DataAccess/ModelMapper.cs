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
            var ownerUser = new User()
            {
                ID = job.OwnerUser.Id,
                Picture = job.OwnerUser.Picture,
                FirstName = job.OwnerUser.FirstName ?? "",
                LastName = job.OwnerUser.LastName ?? "",
                Email = job.OwnerUser.Email ?? "",
                Location = job.OwnerUser.Location ?? "",
                PhoneNumber = job.OwnerUser.PhoneNumber ?? "",
                UserName = job.OwnerUser.UserName ?? "",
            };

            var pets = new List<Pet>();
            foreach (var petJob in job.Pets)
                if (petJob.Pet != null)
                    pets.Add(ToPetModel(petJob.Pet));

            return new Job()
            {
                ID = job.ID,
                Description = job.Description,
                Location = job.Location,
                Payment = job.Payment,
                OwnerUser = ownerUser,
                MinRequiredExperience = job.MinRequiredExperience,
                Pets = pets,
                Repeated = job.Repeated,
                StartDate = job.StartDate.ToUniversalTime(),
                EndDate = job.EndDate,
                Days = job.Days,
                Title = job.Title,
                Type = job.Type,
                Status = job.Status,
            };
        }
        internal static User ToUserModel(DbUser user)
        {
            return new User()
            {
                ID = user.Id,
                UserName = user.UserName ?? "",
                Email = user.Email ?? "",
                Picture = user.Picture,
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? "",
                OwnerProfile = ToOwnerProfileModel(user.OwnerProfile),
                PetSitterProfile = ToPetSitterProfileModel(user.PetSitterProfile),
                PhoneNumber = user.PhoneNumber ?? "",
                Location = user.Location ?? "",
            };
        }
        internal static Pet ToPetModel(DbPet pet) => 
            new Pet 
            { 
                ID = pet.ID,
                Name = pet.Name, 
                Species = pet.Species, 
                Age = pet.Age, 
                Images = ToPetImagesModel(pet.Images.ToList()) 
            };
        
        internal static List<byte[]>? ToPetImagesModel(List<DbPetImage>? images)
        {
            if (images == null)
                return null;
            var result = new List<byte[]>();

            foreach (var image in images)
            {
                if (image != null && image.Picture != null)
                {
                    result.Add(image.Picture);
                }
            }
            return result;
        }

        internal static JobApplication ToJobApplicationModel(DbJobApplication application) => 
            new JobApplication() 
            { 
                ID = application.ID, 
                IsApproved = application.IsApproved,
                Comments = application.Comments.Select(ToJobApplicationCommentModel).ToList(),
                ApplicantUser = ToUserModel(application.ApplicantUser),
            };

        internal static JobApplicationComment ToJobApplicationCommentModel(DbJobApplicationComment jobApplicationComment) =>
            new JobApplicationComment()
            {
                ID = jobApplicationComment.ID,
                SenderUserID = jobApplicationComment.SenderUserID,
                CommentText = jobApplicationComment.CommentText,
                CommentDate = jobApplicationComment.CommentDate,
            };


        internal static OwnerProfile? ToOwnerProfileModel(DbOwnerProfile ownerProfile) =>
            ownerProfile is not null ? new OwnerProfile()
            {
                ID = ownerProfile.ID,
                Description = ownerProfile.Description,
                MinRequiredExperience = ownerProfile.MinRequiredExperience,
                MinWage = ownerProfile.MinWage,
            } : null;

        internal static PetSitterProfile? ToPetSitterProfileModel(DbPetSitterProfile petSitterProfile) =>
            petSitterProfile is not null ? new PetSitterProfile()
            {
                ID = petSitterProfile.ID,
                Description = petSitterProfile.Description,
                AcquiredExperience = petSitterProfile.AcquiredExperience
            } : null;
    }
}