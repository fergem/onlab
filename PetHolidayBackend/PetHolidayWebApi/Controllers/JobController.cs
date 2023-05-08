using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<ActionResult<IReadOnlyCollection<Job>>> List([FromQuery] JobParameters jobParameters)
        {
            if (!jobParameters.ValidHoursRange)
                return BadRequest("Max hours cannot be less than min hours");

            return Ok(await jobService.List(jobParameters));
        }

        [Authorize]
        [HttpGet("posted")]
        public async Task<IReadOnlyCollection<Job>> ListPostedJobs()
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();
            return await jobService.ListPostedJobs(userID);
        }

        [Authorize]
        [HttpGet("undertook")]
        public async Task<IReadOnlyCollection<Job>> ListUndertookJobs()
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();
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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Job>> InsertJob([FromBody] Job job)
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();
            var created = await jobService.Insert(job, userID);
            return CreatedAtAction(nameof(FindById), new { jobID = created.ID }, created);
        }

        [Authorize]
        [HttpPut("takejob/{jobID}")]
        public async Task<ActionResult<Job>> TakeJob([FromRoute] int jobID)
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                BadRequest();
            var underTookJob = await jobService.TakeJob(jobID, userID);
            return CreatedAtAction(nameof(FindById), new { jobID = underTookJob.ID }, underTookJob);
        }
    }
}
