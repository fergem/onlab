using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Models.QueryHelpers;
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
            try
            {
                var response = await userRepository.Register(registerModel);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User> AddProfilePicture(int userID, byte[] file)
        {
            return await userRepository.AddProfilePicture(userID, file);
        }

        public async Task<IReadOnlyCollection<Pet>> ListUsersPets(int userID, PetFilterParameters filter)
        {
            return await petRepository.List(userID, filter);
        }

        public async Task<Pet> FindPetByID(int ID)
        {
            return await petRepository.FindById(ID);
        }

        public async Task<int> InsertPet(Pet pet, int userID)
        {
            return await petRepository.Insert(pet, userID);
        }

        public async Task<Pet> UpdatePet(Pet pet)
        {
            return await petRepository.Update(pet);
        }

        public async Task<Pet> AddPetImage(int ID, byte[] file)
        {
            return await petRepository.AddImage(ID, file);
        }

        public async Task DeletePet(int ID)
        {
            await petRepository.Delete(ID);
        }
    }
}
