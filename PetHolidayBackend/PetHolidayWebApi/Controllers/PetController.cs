using Domain.Models;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/pets")]
    [ApiController]
    public class PetController : ControllerBase
    {
        private readonly IPetService petService;

        public PetController(IPetService _petService)
        {
            petService = _petService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Pet> FindById(int petID)
        {
            var value = petService.FindById(petID);
            return value != null ? Ok() : BadRequest("Houston, we have a problem!"); ;
        }
    }
}
