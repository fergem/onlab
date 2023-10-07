using Domain.Common.AuthHelpers;
using Domain.Common.UpdateModels;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUserRepository
    {
        Task Register(RegisterModel registerModel);
        Task<(User user, IList<string> userRoles)> Login(LoginModel loginModel);

        Task<User> FindById(int userID);
        Task<User> AddProfilePicture(int userID, byte[] file);
        Task<User> UpdateProfile(int userID, UpdateProfileModel updateProfileModel);
        Task<User> ChangePassword(int userID, UpdatePasswordModel password);
    }
}
