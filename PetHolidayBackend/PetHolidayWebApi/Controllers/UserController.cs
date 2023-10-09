﻿using Domain.Common.AuthHelpers;
using Domain.Common.InsertModels;
using Domain.Common.UpdateModels;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PetHolidayWebApi.DTOs;
using PetHolidayWebApi.ModelExtensions;
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
                var refreshToken = authService.GenerateRefreshToken();

                return Ok(result.user.ToUserDTO(result.userRoles.ToList(), token));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<RefreshBearerTokenDTO>> RefreshToken([FromBody] RefreshTokenModel tokenModel)
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

                return Ok(new { AccessToken = result.AccessToken, RefreshToken = result.RefreshToken });
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
        public async Task<ActionResult<PetDTO>> InsertPet([FromBody] InsertPetModel pet)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
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

        [Authorize(Roles = "Owner")]
        [HttpPut("updatepet")]
        public async Task<ActionResult<PetDTO>> UpdatePet([FromBody] UpdatePetModel pet)
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

        [Authorize(Roles = "Owner")]
        [HttpPatch("addpetimage")]
        public async Task<ActionResult<PetDTO>> AddPetImage([FromHeader] int petID, [FromForm] List<IFormFile> file)
        {
            try
            {
                if (file != null)
                {
                    var addPetImageModel = new UpdatePetImagesModel();
                    foreach (var item in file)
                    {
                        using (var stream = new MemoryStream())
                        {
                            await item.CopyToAsync(stream);
                            var fileData = stream.ToArray();
                            addPetImageModel.files.Add(fileData);
                        }
                    }
                    var updatedPet = await userService.AddPetImages(petID, addPetImageModel);
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
