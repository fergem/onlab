using Domain.Common.AuthHelpers;
using Domain.Common.InsertModels;
using Domain.Common.UpdateModels;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PetHolidayWebApi.DTOs;
using PetHolidayWebApi.ModelExtensions;
using System;
using System.IdentityModel.Tokens.Jwt;

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
                if (!ModelState.IsValid)
                    throw new Exception("Register model is not valid");

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

                var refreshToken = authService.GenerateRefreshToken();
                var refreshTokenExpirity = authService.GenerateRefreshTokenExpiryTime();

                var result = await userService.Login(loginModel, refreshToken, refreshTokenExpirity);

                var token = authService.GenerateToken(result.user, result.userRoles);
                

                return Ok(result.user.ToUserDTO(result.userRoles.ToList(), new JwtSecurityTokenHandler().WriteToken(token)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenModel tokenModel)
        {

            try
            {
                var principal = authService.GetPrincipalFromExpiredToken(tokenModel.AccessToken);
                if (principal is null)
                {
                    return BadRequest("Invalid access token or refresh token");
                }

                var newAccessToken = authService.CreateTokenFromClaims(principal.Claims.ToList());
                var newRefreshToken = authService.GenerateRefreshToken();

                var updateRefreshTokenModel = new UpdateRefreshTokenModel()
                {
                    UserName = principal?.Identity?.Name,
                    OldRefreshToken = tokenModel.RefreshToken,
                    NewRefreshToken = newRefreshToken,
                };

                await userService.UpdateRefreshToken(updateRefreshTokenModel);
                var result = new RefreshBearerTokenDTO()
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                    RefreshToken = newRefreshToken
                };

                return new ObjectResult(new
                {
                    accessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                    refreshToken = newRefreshToken
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize]
        [HttpGet("details")]
        public async Task<ActionResult<UserDetailsDTO>> GetUserDetails()
        {
            try
            {
                 var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                var result = await userService.GetUser(userID);
                return Ok(result.ToUserDetailsDTO());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [Authorize(Roles = "Owner")]
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


        [Authorize(Roles = "Owner")]
        [HttpGet("pets")]
        public async Task<ActionResult<IReadOnlyCollection<PetDTO>>> ListPets()
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
            if (!foundUser)
                BadRequest();

            var value = await userService.ListUsersPets(userID);
            return Ok(value.Select(s => s.ToPetDTO()).ToList());
        }

        [Authorize(Roles = "Owner")]
        [HttpPost("addpet")]
        public async Task<ActionResult<PetDTO>> InsertPet([FromForm] InsertPetModel pet, [FromForm] IFormFile? file)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                if(file is null)
                {
                    var created = await userService.InsertPet(pet, null, userID);
                    return CreatedAtAction(nameof(InsertPet), new { petID = created.ID }, created.ToPetDTO());
                }

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    var fileData = stream.ToArray();
                    var created = await userService.InsertPet(pet, fileData, userID);
                    return CreatedAtAction(nameof(InsertPet), new { petID = created.ID }, created.ToPetDTO());
                }
            }
            catch (Exception ex) 
            {
                return BadRequest(ex);
            }
           
        }

        [Authorize(Roles = "Owner")]
        [HttpPut("updatepet")]
        public async Task<ActionResult<PetDTO>> UpdatePet([FromBody] UpdatePetModel pet, [FromForm] IFormFile? file)
        {
            try
            {

                if (file is null)
                {
                    var updatedPet = await userService.UpdatePet(pet, null);
                    return Ok(updatedPet.ToPetDTO());
                }

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    var fileData = stream.ToArray();
                    var updatedPet = await userService.UpdatePet(pet, fileData);
                    return Ok(updatedPet.ToPetDTO());
                }
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
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
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
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
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
        public async Task<ActionResult> ChangePassword(UpdatePasswordModel model)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
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
