using Domain.Models;
using Domain.Models.AuthHelpers;
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
        Task<User> AddProfilePicture(int userID, byte[] file);
    }
}
