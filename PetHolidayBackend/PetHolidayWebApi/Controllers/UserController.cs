
using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;
        private readonly AuthService authService;

        public UserController(UserService userService, AuthService authService)
        {
            this.userService = userService;
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel registerModel)
        {
            await userService.Register(registerModel);
            return Ok(new Response
            {
                Status = "Success",
                Message = "User created successfully!"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await userService.Login(loginModel);
            var token = authService.GenerateToken(result.user, result.userRoles);

            return Ok(new
            {
                bearer = token,
                user = result.user,
                Role = result.userRoles,
                status = "User Login Successfully"
            });
        }

       

        //[HttpGet("/list/{userName}")]
        //public async Task<ActionResult<User>> FindByUsername([FromRoute] string userName)
        //{
        //    var value = await userService.FindByUserName(userName);
        //    return value != null ? Ok() : NotFound();
        //}

        [HttpGet("/pets/{petID}")]
        public async Task<ActionResult<User>> FindPetByID([FromRoute] int petID)
        {
            var value = await userService.FindPetByID(petID);
            return value != null ? Ok() : NotFound(); ;
        }

        [Authorize]
        [HttpGet("pets")]
        public async Task<ActionResult<User>> ListPets()
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();

           var value = await userService.ListUsersPets(userID);
            return Ok(value);
        }


        [Authorize]
        [HttpPost("addpet")]
        public async Task<ActionResult<Pet>> InsertPet([FromBody] Pet pet)
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();
            var created = await userService.InsertPet(pet, userID);
            return CreatedAtAction(nameof(FindPetByID), new { petID = created.ID }, created);
        }           
    }
}
