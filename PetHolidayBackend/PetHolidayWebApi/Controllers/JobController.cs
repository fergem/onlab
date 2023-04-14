using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/jobs")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly JobService jobService;
        private readonly AuthService authService;

        public JobController(JobService jobService, AuthService authService)
        {
            this.jobService = jobService;
            this.authService = authService;
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<Job>> List()
        {
            return await jobService.List();
        }

        [Authorize]
        [HttpGet("posted")]
        public async Task<IReadOnlyCollection<Job>> ListPostedJobs([FromHeader] string Authorization)
        {
            var userID = authService.ValidateToken(Authorization);
            return await jobService.ListPostedJobs(userID);
        }

        [Authorize]
        [HttpGet("undertook")]
        public async Task<IReadOnlyCollection<Job>> ListUndertookJobs([FromHeader] string Authorization)
        {
            var userID = authService.ValidateToken(Authorization);
            return await jobService.ListUnderTookJobs(userID);
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
        public async Task<ActionResult<User>> FindStatusById([FromRoute] int statusID)
        {
            var value = await jobService.FindStatusById(statusID);
            return value != null ? Ok(value) : NotFound(); ;
        }

        [HttpPost]
        public async Task<ActionResult<Job>> InsertJob([FromBody] Job job)
        {
            var created = await jobService.Insert(job);
            return CreatedAtAction(nameof(FindById), new { jobID = created.ID }, created);
        }
    }
}
