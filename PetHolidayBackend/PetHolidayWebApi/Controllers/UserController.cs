using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly PetService petService;
        private readonly UserService userService;

        public UserController(PetService petService, UserService userService)
        {
            this.petService = petService;
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<User>> List()
        {
            return await userService.List();
        }
    }
}
