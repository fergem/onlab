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
        private readonly PetService petService;

        public PetController(PetService _petService)
        {
            petService = _petService;
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<Pet>> List()
        {
            return await petService.List();
        }

        [HttpGet("{petID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pet>> FindById([FromRoute]int petID)
        {
            var value = await petService.FindById(petID);
            return value != null ? Ok() : NotFound(); ;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pet>> Insert([FromBody] Pet pet)
        {
            var created = await petService.Insert(pet);
            return CreatedAtAction(nameof(FindById), new { petID = created.ID }, created);
        }
    }
}
