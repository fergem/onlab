using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Models.QueryHelpers;
using Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<DbUser> userManager;
        //private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<DbUser> signInManager;
        private readonly PetHolidayDbContext dbContext;
        public UserRepository(UserManager<DbUser> userManager, SignInManager<DbUser> signInManager, PetHolidayDbContext dbContext)
        {
            this.userManager = userManager;
            //this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.dbContext = dbContext;
        }



        public async Task<(User user, IList<string> userRoles)> Login(LoginModel loginModel)
        {
            var user = await userManager.FindByNameAsync(loginModel.Username);
            if (user == null)
                throw new Exception("Incorrect username");

            var result = await signInManager.PasswordSignInAsync(user, loginModel.Password, loginModel.RememberMe, false);
            if (!result.Succeeded)
                throw new Exception("Incorrect password");

            //if(user.firstLogin)
            //{

            //}
            
            var userRoles = await userManager.GetRolesAsync(user);
            return (ModelMapper.ToUserModel(user), userRoles);
        }

        public async Task<User> Register(RegisterModel registerModel)
        {
            var IsExist = await userManager.FindByNameAsync(registerModel.Username);
            if (IsExist != null)
                throw new Exception("User already exist");

            DbUser appUser = new DbUser
            {
                UserName = registerModel.Username,
                Email = registerModel.Email,
                Password = registerModel.Password,
                //firstLogin = true,
            };
            var result = await userManager.CreateAsync(appUser, registerModel.Password);
            if (!result.Succeeded)
                throw new Exception("User creation failed, check user credentials");
 
            return ModelMapper.ToUserModel(appUser);
        }

        public async Task<UserInformation> AddProfilePicture(int userID, byte[] file)
        {
            var user = await userManager.FindByIdAsync(userID.ToString());
            if (user == null)
                throw new Exception("User not exists");
            user.Picture = file;

            await userManager.UpdateAsync(user);
            await signInManager.RefreshSignInAsync(user);

            await dbContext.SaveChangesAsync();
            return ModelMapper.ToUserInformationModel(user);
        }

        public async Task<UserInformation> UpdateProfile(int userID, UpdateProfileModel updateProfileModel)
        {
            var user = await userManager.FindByIdAsync(userID.ToString());
            if (user == null)
                throw new Exception("User not exists");

            user.Location = updateProfileModel?.Location ?? user.Location;
            user.FirstName = updateProfileModel?.FirstName ?? user.FirstName;
            user.LastName = updateProfileModel?.LastName ?? user.LastName;
            user.Email = updateProfileModel?.Email ?? user.Email;
            user.Age = updateProfileModel?.Age ?? user.Age;
            user.PhoneNumber = updateProfileModel?.PhoneNumber ?? user.PhoneNumber;

            await userManager.UpdateAsync(user);
            await signInManager.RefreshSignInAsync(user);

            await dbContext.SaveChangesAsync();
            return ModelMapper.ToUserInformationModel(user);

        }

        public async Task<UserInformation> ChangePassword(int userID, ChangePasswordModel password)
        {
            var user = await userManager.FindByIdAsync(userID.ToString());
            if (user == null)
                throw new Exception("User not exists");

            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            await userManager.ResetPasswordAsync(user, token, password.Password ?? user.Password);

            await signInManager.RefreshSignInAsync(user);
            await dbContext.SaveChangesAsync();
            return ModelMapper.ToUserInformationModel(user);
        }
    }
}
