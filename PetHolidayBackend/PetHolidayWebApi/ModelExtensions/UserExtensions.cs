using PetHolidayWebApi.DTOs;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class UserExtensions
    {
        public static UserDTO ToUserDTO(this Domain.Models.User user) =>
            new UserDTO
            {
                ID = user.ID,
                UserName = user.UserName,
                Bearer = user.Bearer,
                Email = user.Email,
            };

        public static UserDetailsDTO ToUserDetailsDTO(this Domain.Models.User user) =>
            new UserDetailsDTO
            {
                ID = user.ID,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Location = user.Location,
                PhoneNumber = user.PhoneNumber,
                Picture = user.Picture,
                OwnerProfile = user?.OwnerProfile?.ToOwnerProfileDTO(),
                PetSitterProfile = user?.PetSitterProfile?.ToPetSitterProfileDTO(),
            };

        public static UserPreviewDTO ToUserPreviewDTO(this Domain.Models.User user) =>
            new UserPreviewDTO
            {
                ID = user.ID,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Picture = user.Picture,
            };

        public static OwnerProfileDTO ToOwnerProfileDTO(this Domain.Models.OwnerProfile ownerProfile) =>
            new OwnerProfileDTO
            {
                ID = ownerProfile.ID,
                Description = ownerProfile.Description,
                MinRequiredExperience = ownerProfile.MinRequiredExperience,
                MinWage = ownerProfile.MinWage,
            };

        public static PetSitterProfileDTO ToPetSitterProfileDTO(this Domain.Models.PetSitterProfile petSitterProfile) =>
            new PetSitterProfileDTO
            {
                ID = petSitterProfile.ID,
                Description = petSitterProfile.Description,
                AcquiredExperience = petSitterProfile.AcquiredExperience,
            };
    }
}
