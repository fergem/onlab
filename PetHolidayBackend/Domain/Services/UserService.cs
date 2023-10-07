using Domain.Common.AuthHelpers;
using Domain.Common.InsertModels;
using Domain.Common.UpdateModels;
using Domain.Models;
using Domain.Repositories;
using System.Security.Claims;

namespace Domain.Services
{
    public class UserService
    {
        private readonly IPetRepository petRepository;
        private readonly IUserRepository userRepository;
        private readonly IJobRepository jobRepository;

        public UserService(IPetRepository petRepository, IUserRepository userRepository, IJobRepository jobRepository)
        { 
            this.petRepository = petRepository;
            this.userRepository = userRepository;
            this.jobRepository = jobRepository;
        }
        public async Task<(User user, IList<string> userRoles)> Login(LoginModel loginModel) => await userRepository.Login(loginModel);
        public async Task Register(RegisterModel registerModel) => await userRepository.Register(registerModel);
        public async Task<User> GetUser(int userID) => await userRepository.FindById(userID);
        public async Task<User> AddProfilePicture(int userID, byte[] file) => await userRepository.AddProfilePicture(userID, file);
        public async Task<IReadOnlyCollection<Pet>> ListUsersPets(int userID) => await petRepository.List(userID);
        public async Task<Pet> InsertPet(InsertPetModel pet, int userID) => await petRepository.Insert(pet, userID);
        public async Task<Pet> UpdatePet(UpdatePetModel pet) => await petRepository.Update(pet);
        public async Task<Pet> AddPetImages(int ID, UpdatePetImagesModel addPetImagesModel) => await petRepository.InsertImages(ID, addPetImagesModel);
        public async Task<User> UpdateProfile(int userID, UpdateProfileModel model) => await userRepository.UpdateProfile(userID, model);
        public async Task<User> ChangePassword(int userID, UpdatePasswordModel password) => await userRepository.ChangePassword(userID, password);

        public async Task DeletePet(int ID)
        {
            await petRepository.Delete(ID);
            await jobRepository.RemoveJobsDependentOnPet(ID);
        }
    }
}
