using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly IConfiguration configuration;

        public UserController(UserService userService, IConfiguration configuration)
        {
            this.userService = userService;
            this.configuration = configuration;
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

            var authClaims = new List<Claim> {
                new Claim(ClaimTypes.Name, result.user.UserName),
                new Claim(ClaimTypes.Email, result.user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            foreach (var userRole in result.userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JsonWebTokenKeys:IssuerSigningKey"]));
            var token = new JwtSecurityToken(expires: DateTime.Now.AddHours(3), claims: authClaims, signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
            return Ok(new
            {
                bearer = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
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
        [HttpPost("/addpet")]
        public async Task<ActionResult<Pet>> InsertPet([FromBody] Pet pet)
        {
            var created = await userService.InsertPet(pet,1);
            return CreatedAtAction(nameof(FindPetByID), new { petID = created.ID }, created);
        }
    }
}
