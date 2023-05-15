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
            if (!jobParameters.ValidJobStatus)
                return BadRequest("Requested status doesnt exist");

            return Ok(await jobService.List(jobParameters));
        }

        [Authorize]
        [HttpGet("posted")]
        public async Task<ActionResult<IReadOnlyCollection<Job>>> ListPostedJobs([FromQuery] JobParameters jobParameters)
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            if (!jobParameters.ValidHoursRange)
                return BadRequest("Max hours cannot be less than min hours");
            if (!jobParameters.ValidJobStatus)
                return BadRequest("Requested status doesnt exist");
            return Ok(await jobService.ListPostedJobs(userID, jobParameters));
        }

        [Authorize]
        [HttpGet("approvals")]
        public async Task<ActionResult<IReadOnlyCollection<Job>>> ListApprovals()
        {
            var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            return Ok(await jobService.ListApprovals(userID));
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
            try
            {
                var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
                if (!foundUser)
                    return BadRequest("There is no such user with this Bearer");

                var underTookJob = await jobService.TakeJob(jobID, userID);
                return CreatedAtAction(nameof(FindById), new { jobID = underTookJob.ID }, underTookJob);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPut("approvejob/{jobID}")]
        public async Task<ActionResult<Job>> ApproveUser([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
                if (!foundUser)
                    return BadRequest("There is no such user with this Bearer");

                var job = await jobService.ApproveUser(jobID);
                return CreatedAtAction(nameof(FindById), new { jobID = job.ID }, job);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPut("declineuser/{jobID}")]
        public async Task<ActionResult<Job>> DeclineUser([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ID").Value, out var userID);
                if (!foundUser)
                    return BadRequest("There is no such user with this Bearer");

                var job = await jobService.DeclineUser(jobID);
                return CreatedAtAction(nameof(FindById), new { jobID = job.ID }, job);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
