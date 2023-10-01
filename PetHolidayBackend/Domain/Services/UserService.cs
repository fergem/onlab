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
        private readonly IJobRepository jobRepository;

        public UserService(IPetRepository petRepository, IUserRepository userRepository, IJobRepository jobRepository)
        {
            this.petRepository = petRepository;
            this.userRepository = userRepository;
            this.jobRepository = jobRepository;
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

        public async Task<UserInformation> AddProfilePicture(int userID, byte[] file)
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

        public async Task<Pet> AddPetImages(int ID, List<byte[]> files)
        {
            return await petRepository.AddImages(ID, files);
        }

        public async Task DeletePet(int ID)
        {
            await petRepository.Delete(ID);
            await jobRepository.RemoveJobsDependentOnPet(ID);
        }

        public async Task<UserInformation> UpdateProfile(int userID, UpdateProfileModel model)
        {
            return await userRepository.UpdateProfile(userID, model);
        }
        public async Task<UserInformation> ChangePassword(int userID, ChangePasswordModel password)
        {
            return await userRepository.ChangePassword(userID, password);
        }
    }
}
