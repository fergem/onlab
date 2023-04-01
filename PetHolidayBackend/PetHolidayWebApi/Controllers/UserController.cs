using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.AuthHelpers;
using Domain.Services;
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
        private readonly UserManager<DbUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<DbUser> signInManager;
        private readonly IConfiguration configuration;

        public UserController(UserService userService, UserManager<DbUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<DbUser> signInManager, IConfiguration configuration)
        {
            this.userService = userService;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
        }

        [HttpGet("/list")]
        public async Task<IReadOnlyCollection<User>> List()
        {
            return await userService.List();
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var IsExist = await userManager.FindByNameAsync(registerModel.Username);
            if (IsExist != null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
            {
                Status = "Error",
                Message = "User already exists!"
            });
            DbUser appUser = new DbUser
            {
                UserName = registerModel.Username,
                Email = registerModel.Email,
                Password = registerModel.Password,
                firstLogin = true,
            };
            var result = await userManager.CreateAsync(appUser, registerModel.Password);
            if (!result.Succeeded) return StatusCode(StatusCodes.Status500InternalServerError, new Response
            {
                Status = "Error",
                Message = "User creation failed! Please check user details and try again."
            });
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
            
            var user = await userManager.FindByNameAsync(loginModel.Username);
            if (user == null)
                return Unauthorized("Incorrect username");

            var result = await signInManager.PasswordSignInAsync(user, loginModel.Password, loginModel.RememberMe, false);
            if (!result.Succeeded)
                return Unauthorized("Incorrect password");
            
            //if(user.firstLogin)
            //{

            //}

            var userRoles = await userManager.GetRolesAsync(user);
            var authClaims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JsonWebTokenKeys:IssuerSigningKey"]));
            var token = new JwtSecurityToken(expires: DateTime.Now.AddHours(3), claims: authClaims, signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
            return Ok(new
            {
                bearer = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                user = user,
                Role = userRoles,
                status = "User Login Successfully"
            });
        }


        [HttpGet("/list/{userName}")]
        public async Task<ActionResult<User>> FindByUsername([FromRoute] string userName)
        {
            var value = await userService.FindByUserName(userName);
            return value != null ? Ok() : NotFound();
        }

        [HttpGet("/pets/{petID}")]
        public async Task<ActionResult<User>> FindPetByID([FromRoute] int petID)
        {
            var value = await userService.FindPetByID(petID);
            return value != null ? Ok() : NotFound(); ;
        }

        [HttpPost]
        public async Task<ActionResult<Pet>> InsertPet([FromBody] Pet pet)
        {
            var created = await userService.InsertPet(pet);
            return CreatedAtAction(nameof(FindPetByID), new { petID = created.ID }, created);
        }
    }
}
