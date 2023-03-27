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
        private readonly IPetRepository petRepository;

        public UserService(IUserRepository userRepository, IPetRepository petRepository)
        {
            this.userRepository = userRepository;
            this.petRepository = petRepository;
        }
        public async Task<IReadOnlyCollection<User>> List()
        {
            return await userRepository.List();
        }


        public async Task<User> FindByUserName(string username)
        {
            return await userRepository.FindByUserName(username);
        }

        public async Task<IReadOnlyCollection<Pet>> ListUsersPets()
        {
            return await petRepository.List();
        }

        public async Task<Pet> FindPetByID(int ID)
        {
            return await petRepository.FindById(ID);
        }

        public async Task<User> InsertUser(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Delete(int userID)
        {
            throw new NotImplementedException();
        }
    }
}
