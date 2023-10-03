using Domain.Common.AuthHelpers;
using Domain.Common.QueryHelpers;
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
        Task<UserAdditionalInfo> Register(RegisterModel registerModel);
        Task<(UserAdditionalInfo user, IList<string> userRoles)> Login(LoginModel loginModel);
        Task<User> AddProfilePicture(int userID, byte[] file);
        Task<User> UpdateProfile(int userID, UpdateProfileModel updateProfileModel);
        Task<User> ChangePassword(int userID, ChangePasswordModel password);
    }
}
