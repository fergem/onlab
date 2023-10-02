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
        Task<User> Register(RegisterModel registerModel);
        Task<(User user, IList<string> userRoles)> Login(LoginModel loginModel);
        Task<UserBaseInformation> AddProfilePicture(int userID, byte[] file);
        Task<UserBaseInformation> UpdateProfile(int userID, UpdateProfileModel updateProfileModel);
        Task<UserBaseInformation> ChangePassword(int userID, ChangePasswordModel password);
    }
}
