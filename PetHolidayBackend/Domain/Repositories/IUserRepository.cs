using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUserRepository
    {
        Task<IReadOnlyCollection<User>> List();
        Task<User> FindById(int userID);
        Task<User> FindByName(string username);
        Task<User> FindPetById(int petID);
        Task<User> Insert(User user);
        //Task<Pet> Update(User user);
        Task<User> Delete(int userID);
    }
}
