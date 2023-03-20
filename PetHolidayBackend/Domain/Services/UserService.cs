using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class UserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<IReadOnlyCollection<User>> List()
        {
            return await userRepository.List();
        }


        public async Task<User> FindByName(string username)
        {
            return await userRepository.FindByName(username);
        }

        public async Task<User> FindPetById(int petID)
        {
            return await userRepository.FindPetById(petID);
        }

        public async Task<User> Insert(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Delete(int userID)
        {
            throw new NotImplementedException();
        }
    }
}
