using Domain.Models;
using PetHolidayWebApi.DTOs;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class UserExtensions
    {
        public static UserDTO ToUserDTO(this User user, List<string> role, string bearer) =>
            new UserDTO
            {
                ID = user.Id,
                UserName = user.UserName,
                AccessToken = bearer,
                Roles = role,
                RefreshToken = user.RefreshToken,
                Picture = user.Picture
            };

        public static UserDetailsDTO ToUserDetailsDTO(this User user) =>
            new UserDetailsDTO
            {
                ID = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Location = user.Location,
                PhoneNumber = user.PhoneNumber,
                Picture = user.Picture,
                OwnerProfile = user?.OwnerProfile?.ToOwnerProfileDTO(),
                PetSitterProfile = user?.PetSitterProfile?.ToPetSitterProfileDTO(),
                
            };

        public static UserPreviewDTO ToUserPreviewDTO(this User user) =>
            new UserPreviewDTO
            {
                ID = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Picture = user.Picture,
            };

        public static OwnerProfileDTO ToOwnerProfileDTO(this OwnerProfile ownerProfile) =>
            new OwnerProfileDTO
            {
                ID = ownerProfile.ID,
                Description = ownerProfile.Description,
                MinRequiredExperience = ownerProfile.MinRequiredExperience,
                MinWage = ownerProfile.MinWage,
            };

        public static PetSitterProfileDTO ToPetSitterProfileDTO(this PetSitterProfile petSitterProfile) =>
            new PetSitterProfileDTO
            {
                ID = petSitterProfile.ID,
                Description = petSitterProfile.Description,
                AcquiredExperience = petSitterProfile.AcquiredExperience,
            };
    }
}
