using Domain.Models;
using Domain.Common.AuthHelpers;
using Domain.Common.UpdateModels;
using Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly PetHolidayDbContext dbContext;
        private readonly RoleManager<IdentityRole<int>> roleManager;
        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, PetHolidayDbContext dbContext, RoleManager<IdentityRole<int>> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.dbContext = dbContext;
            this.roleManager = roleManager;
        }

        public async Task<(User user, IList<string> userRoles)> Login(LoginModel loginModel)
        {

            var user = await userManager.Users.FirstOrDefaultAsync(s => s.UserName == loginModel.Username) ?? throw new Exception("User not exists");

            var result = await signInManager.PasswordSignInAsync(user, loginModel.Password, false, false);
            if (!result.Succeeded)
                throw new Exception("Incorrect password");
            
            var userRoles = await userManager.GetRolesAsync(user);
            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
            await dbContext.SaveChangesAsync();
            return new (user, userRoles);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public async Task Register(RegisterModel registerModel)
        {
            var IsExist = await userManager.FindByNameAsync(registerModel.Username);
            if (IsExist is not null)
                throw new Exception("User already exist");

            var appUser = new User
            {
                UserName = registerModel.Username,
                Email = registerModel.Email,
                Password = registerModel.Password,
                LastName = registerModel.LastName,
                FirstName = registerModel.FirstName,
            };

            var result = await userManager.CreateAsync(appUser, registerModel.Password);
            if (!result.Succeeded)
                throw new Exception("User creation failed, check user credentials");

            if (registerModel.IsOwner)
            {
                //var role = await roleManager.FindByNameAsync("OWNER");
                var roles = roleManager.Roles.ToList();
                var roleResult = await userManager.AddToRoleAsync(appUser, "OWNER");
                if (!roleResult.Succeeded)
                    throw new Exception("Role could not be set to User");
            }
            if (registerModel.IsPetSitter)
            {
                var roleResult = await userManager.AddToRoleAsync(appUser, "PETSITTER");
                if (!roleResult.Succeeded)
                    throw new Exception("Role could not be set to User");
            }


            var defaultPetSitterProfile = new PetSitterProfile()
            {
                AcquiredExperience = 0,
                Description = "",
                User = appUser
            };
            var defaultOwnerProfile = new OwnerProfile()
            {
                Description = "",
                User = appUser,
                MinRequiredExperience = 0,
                MinWage = 0,
            };

            await dbContext.AddAsync(defaultPetSitterProfile);
            await dbContext.AddAsync(defaultOwnerProfile);
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateRefreshToken(UpdateRefreshTokenModel updateRefreshTokenModel)
        {
            if (updateRefreshTokenModel.UserName is null)
                throw new Exception("Username not exists");

            var user = await userManager.FindByNameAsync(updateRefreshTokenModel.UserName) ?? throw new Exception("User not exists");

            if (user == null || !string.Equals(user.RefreshToken, updateRefreshTokenModel.OldRefreshToken) || user.RefreshTokenExpiryTime <= DateTime.Now)
                throw new Exception("Invalid access token or refres h token");

            user.RefreshToken = updateRefreshTokenModel.NewRefreshToken;
            await userManager.UpdateAsync(user);
        }


        public async Task<User> FindById(int userID)
        {
            var user = await userManager.Users
                .Include(s => s.OwnerProfile)
                .Include(s => s.PetSitterProfile)
                .FirstOrDefaultAsync(s => s.Id == userID) ?? throw new Exception("User not exists");

            return user;
        }

        public async Task<User> AddProfilePicture(int userID, byte[] file)
        {
            var user = await userManager.Users
                .Include(s => s.OwnerProfile)
                .Include(s => s.PetSitterProfile)
                .FirstOrDefaultAsync(s => s.Id == userID) ?? throw new Exception("User not exists");

            user.Picture = file;

            await userManager.UpdateAsync(user);
            await signInManager.RefreshSignInAsync(user);

            await dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateProfile(int userID, UpdateProfileModel updateProfileModel)
        {
            var user = await userManager.Users
                .Include(s => s.OwnerProfile)
                .Include(s => s.PetSitterProfile)
                .FirstOrDefaultAsync(s => s.Id == userID) ?? throw new Exception("User not exists");

            user.Location = updateProfileModel?.Location ?? user.Location;
            user.FirstName = updateProfileModel?.FirstName ?? user.FirstName;
            user.LastName = updateProfileModel?.LastName ?? user.LastName;
            user.Email = updateProfileModel?.Email ?? user.Email;
            user.Age = updateProfileModel?.Age ?? user.Age;
            user.PhoneNumber = updateProfileModel?.PhoneNumber ?? user.PhoneNumber;

            if(updateProfileModel?.PetSitterProfile is not null)
            {
                if (user.PetSitterProfile is not null)
                {
                    user.PetSitterProfile = new PetSitterProfile
                    {
                        AcquiredExperience = updateProfileModel.PetSitterProfile.AcquiredExperience ,
                        Description = updateProfileModel.PetSitterProfile.Description
                    };
                }
                else
                {
                    user.PetSitterProfile.AcquiredExperience = updateProfileModel.PetSitterProfile.AcquiredExperience ;
                    user.PetSitterProfile.Description = updateProfileModel.PetSitterProfile.Description;
                }
            }

           
            if(updateProfileModel?.OwnerProfile is not null)
            {
                if (user.OwnerProfile is not null)
                {
                    user.OwnerProfile.Description = updateProfileModel.OwnerProfile.Description;
                    user.OwnerProfile.MinRequiredExperience = updateProfileModel.OwnerProfile.MinRequiredExperience;
                    user.OwnerProfile.MinWage = updateProfileModel.OwnerProfile.MinWage;
                }
                else
                {
                    user.OwnerProfile = new OwnerProfile
                    {
                        Description = updateProfileModel.OwnerProfile.Description,
                        MinRequiredExperience = updateProfileModel.OwnerProfile.MinRequiredExperience,
                        MinWage = updateProfileModel.OwnerProfile.MinWage
                    };
                }
            }

            await signInManager.RefreshSignInAsync(user);
            await dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> ChangePassword(int userID, UpdatePasswordModel password)
        {
            var user = await userManager.FindByIdAsync(userID.ToString());
            if (user == null)
                throw new Exception("User not exists");

            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            await userManager.ResetPasswordAsync(user, token, password.Password ?? user.Password);

            await signInManager.RefreshSignInAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }
    }
}
