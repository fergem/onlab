using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<User>> List()
        {
            return await userService.List();
        }

        [HttpGet("{userName}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> FindByUsername([FromRoute] string userName)
        {
            var value = await userService.FindByUserName(userName);
            return value != null ? Ok() : NotFound(); ;
        }

        /*[HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pet>> InsertPet([FromBody] Pet pet)
        {
            var created = await userService.Insert(pet);
            return CreatedAtAction(nameof(FindPetByID), new { petID = created.ID }, created);
        }*/
    }
}
