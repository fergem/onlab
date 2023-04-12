using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<DbUser> userManager;
        //private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<DbUser> signInManager;

        public UserRepository(UserManager<DbUser> userManager, SignInManager<DbUser> signInManager)
        {
            this.userManager = userManager;
            //this.roleManager = roleManager;
            this.signInManager = signInManager;
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

        
    }
}
