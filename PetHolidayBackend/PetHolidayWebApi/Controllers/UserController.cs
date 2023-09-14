
using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Drawing;
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
            try
            {
                var result = await userService.Register(registerModel);
                return Ok(new Response
                {
                    Status = "Success",
                    Message = "User created successfully!"
                });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await userService.Login(loginModel);
            var token = authService.GenerateToken(result.user, result.userRoles);
            result.user.Bearer = token;
            return Ok(new
            {
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
        public async Task<ActionResult<Pet>> InsertPet([FromForm] IFormFile file)
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();
            /*if (file != null)
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    var fileData = stream.ToArray();
                    pet.Image = new PetImage()
                    {
                        Picture = fileData,
                    };
                }
            }
            var created = await userService.InsertPet(pet, userID);*/
            return CreatedAtAction(nameof(FindPetByID), new { petID = 5 }, 5);
        }

        [Authorize]
        [HttpPut("updatepet")]
        public async Task<ActionResult<Pet>> UpdatePet([FromBody] Pet pet)
        {
            var updatedPet = await userService.UpdatePet(pet);
            return CreatedAtAction(nameof(FindPetByID), new { petID = updatedPet.ID }, updatedPet);
        }

        //outdated
        [Authorize]
        [HttpPost("addpetimage")]
        public async Task<ActionResult<Pet>> AddPetImage([FromHeader] int petID,[FromForm] IFormFile file)
        {
            if (file != null)
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    var fileData = stream.ToArray();
                    var updatedPet = await userService.AddPetImage(petID, fileData);
                    return CreatedAtAction(nameof(FindPetByID), new { petID = updatedPet.ID }, updatedPet);
                }
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPost("addprofilepicture")]
        public async Task<ActionResult<Pet>> AddProfilePicture([FromForm] IFormFile file)
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();
            if (file != null)
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    var fileData = stream.ToArray();
                    var updatedPet = await userService.AddProfilePicture(userID, fileData);
                    return CreatedAtAction(nameof(FindPetByID), new { petID = updatedPet.ID }, updatedPet);
                }
            }
            return BadRequest();
        }
    }
}
