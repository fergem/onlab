using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/jobs")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly JobService jobService;

        public JobController(JobService jobService)
        {
            this.jobService = jobService;
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<Job>> List()
        {
            return await jobService.List();
        }

        [HttpGet("{jobID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> FindById([FromRoute] int jobID)
        {
            var value = await jobService.FindById(jobID);
            return value != null ? Ok() : NotFound(); ;
        }


        [HttpGet("status/{statusID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> FindStatusById([FromRoute] int statusID)
        {
            var value = await jobService.FindStatusById(statusID);
            return value != null ? Ok(value) : NotFound(); ;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Job>> InsertJob([FromBody] Job job)
        {
            var created = await jobService.Insert(job);
            return CreatedAtAction(nameof(FindById), new { jobID = created.ID }, created);
        }
    }
}
