﻿using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Repositories;
using System.Security.Claims;

namespace Domain.Services
{
    public class UserService
    {
        private readonly IPetRepository petRepository;
        private readonly IUserRepository userRepository;

        public UserService(IPetRepository petRepository, IUserRepository userRepository)
        {
            this.petRepository = petRepository;
            this.userRepository = userRepository;
        }
        public async Task<(User user, IList<string> userRoles)> Login(LoginModel loginModel)
        {
            return await userRepository.Login(loginModel);
        }
        public async Task<User> Register(RegisterModel registerModel)
        {
            return await userRepository.Register(registerModel);
        }

        public async Task<IReadOnlyCollection<Pet>> ListUsersPets(int userID)
        {
            return await petRepository.List(userID);
        }

        public async Task<Pet> FindPetByID(int ID)
        {
            return await petRepository.FindById(ID);
        }

        public async Task<Pet> InsertPet(Pet pet, int userID)
        {
            return await petRepository.Insert(pet, userID);
        }
    }
}
