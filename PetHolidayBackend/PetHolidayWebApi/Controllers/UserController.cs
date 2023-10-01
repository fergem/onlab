
using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Models.QueryHelpers;
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

        [Authorize]
        [HttpDelete("deletepet/{petID}")]
        public async Task<ActionResult<User>> Deletepet([FromRoute] int petID)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();
            try
            {
                await userService.DeletePet(petID);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);                    
            }
            return Ok();
        }


        [Authorize]
        [HttpGet("pets")]
        public async Task<ActionResult<User>> ListPets([FromQuery] PetFilterParameters filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();

            var value = await userService.ListUsersPets(userID, filter);
            return Ok(value);
        }


        [Authorize]
        [HttpPost("addpet")]
        public async Task<ActionResult<int>> InsertPet([FromBody] Pet pet)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();
            
            var created = await userService.InsertPet(pet, userID);
            return CreatedAtAction(nameof(InsertPet), new { petID = created }, created);
        }

        [Authorize]
        [HttpPut("updatepet")]
        public async Task<ActionResult<Pet>> UpdatePet([FromBody] Pet pet)
        {
            var updatedPet = await userService.UpdatePet(pet);
            return CreatedAtAction(nameof(UpdatePet), new { petID = updatedPet.ID }, updatedPet);
        }

        [Authorize]
        [HttpPost("addpetimage")]
        public async Task<ActionResult<Pet>> AddPetImage([FromHeader] int petID, [FromForm] List<IFormFile> file)
        {
            if (file != null)
            {
                var files = new List<byte[]>();
                foreach (var item in file)
                {
                    using (var stream = new MemoryStream())
                    {
                        await item.CopyToAsync(stream);
                        var fileData = stream.ToArray();
                        files.Add(fileData);
                    }
                }
                var updatedPet = await userService.AddPetImages(petID, files);
                return CreatedAtAction(nameof(AddPetImage), new { petID = updatedPet.ID }, updatedPet);
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPost("addprofilepicture")]
        public async Task<ActionResult<UserInformation>> AddProfilePicture([FromForm] IFormFile file)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();
            if (file != null)
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    var fileData = stream.ToArray();
                    var updatedPet = await userService.AddProfilePicture(userID, fileData);
                    return CreatedAtAction(nameof(AddProfilePicture), updatedPet);
                }
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPatch("updateprofile")]
        public async Task<ActionResult<User>> UpdateProfile(UpdateProfileModel updateProfileModel)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();
            var updatedUser = await userService.UpdateProfile(userID, updateProfileModel);
            return Ok(updatedUser);
        }

        [Authorize]
        [HttpPatch("changepassword")]
        public async Task<ActionResult<User>> ChangePassword(ChangePasswordModel model)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();
            var updatedUser = await userService.ChangePassword(userID, model);
            return Ok(updatedUser);
        }
    }
}
