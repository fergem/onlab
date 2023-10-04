
using Domain.Common.AuthHelpers;
using Domain.Common.QueryHelpers;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PetHolidayWebApi.DTOs;
using PetHolidayWebApi.ModelExtensions;
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
                await userService.Register(registerModel);
                return CreatedAtAction(nameof(Register),"User registered successfully!");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new Exception("Logging model is not valid");

                var result = await userService.Login(loginModel);
                var token = authService.GenerateToken(result.user, result.userRoles);
                result.user.Bearer = token;

                return Ok(new UserDTO() {
                    ID = result.user.ID,
                    Bearer = result.user.Bearer,
                    UserName = result.user.UserName,
                    Email = result.user.Email,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("deletepet/{petID}")]
        public async Task<ActionResult> Deletepet([FromRoute] int petID)
        {
            try
            {
                await userService.DeletePet(petID);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);                    
            }
        }


        [Authorize]
        [HttpGet("pets")]
        public async Task<ActionResult<IReadOnlyCollection<PetDTO>>> ListPets([FromQuery] PetFilterParameters filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();

            var value = await userService.ListUsersPets(userID, filter);
            return Ok(value.Select(s => s.ToPetDTO()).ToList());
        }

        [Authorize]
        [HttpPost("addpet")]
        public async Task<ActionResult<PetDTO>> InsertPet([FromBody] Pet pet)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                var created = await userService.InsertPet(pet, userID);
                return CreatedAtAction(nameof(InsertPet), new { petID = created.ID }, created.ToPetDTO());
            }
            catch (Exception ex) 
            {
                return BadRequest(ex);
            }
           
        }

        [Authorize]
        [HttpPut("updatepet")]
        public async Task<ActionResult<PetDTO>> UpdatePet([FromBody] Pet pet)
        {
            try
            {
                var updatedPet = await userService.UpdatePet(pet);
                return Ok(updatedPet.ToPetDTO());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("addpetimage")]
        public async Task<ActionResult<PetDTO>> AddPetImage([FromHeader] int petID, [FromForm] List<IFormFile> file)
        {
            try
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
                    return Ok(updatedPet.ToPetDTO());
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("addprofilepicture")]
        public async Task<ActionResult<UserDetailsDTO>> AddProfilePicture([FromForm] IFormFile file)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");
                if (file != null)
                {
                    using (var stream = new MemoryStream())
                    {
                        await file.CopyToAsync(stream);
                        var fileData = stream.ToArray();
                        var updatedUser = await userService.AddProfilePicture(userID, fileData);
                        return Ok(updatedUser.ToUserDetailsDTO());
                    }
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("updateprofile")]
        public async Task<ActionResult<UserDetailsDTO>> UpdateProfile(UpdateProfileModel updateProfileModel)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                var updatedUser = await userService.UpdateProfile(userID, updateProfileModel);
                return Ok(updatedUser.ToUserDetailsDTO());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("changepassword")]
        public async Task<ActionResult> ChangePassword(ChangePasswordModel model)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                var updatedUser = await userService.ChangePassword(userID, model);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
