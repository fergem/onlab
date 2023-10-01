using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
        public async Task<ActionResult<IReadOnlyCollection<Job>>> List([FromQuery] JobFilter jobParameters)
        {
            if (!jobParameters.ValidOnce && jobParameters.ValidOnce)
                return BadRequest("Filter is not good");
            else if (!jobParameters.ValidRepeated && jobParameters.ValidRepeated)
                return BadRequest("Filter is not good");

            var result = await jobService.List(jobParameters);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("posted")]
        public async Task<ActionResult<IReadOnlyCollection<Job>>> ListPostedJobs([FromQuery] JobFilterParticipant filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            
            return Ok(await jobService.ListPostedJobs(userID, filter));
        }

        [Authorize]
        [HttpGet("undertook")]
        public async Task<ActionResult<IReadOnlyCollection<Job>>> ListUndertookJobs([FromQuery] JobFilterParticipant filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            

            return Ok(await jobService.ListUnderTookJobs(userID, filter));
        }

        [Authorize]
        [HttpGet("approvals")]
        public async Task<ActionResult<IReadOnlyCollection<Job>>> ListApprovals()
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            return Ok(await jobService.ListApprovals(userID));
        }

        [HttpGet("{jobID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> FindById([FromRoute] int jobID) 
        {
            var value = await jobService.FindById(jobID);
            return value != null ? Ok(value) : NotFound(); ;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<int>> InsertJob([FromBody] InsertJobModel jobModel)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();
            var created = await jobService.Insert(jobModel, userID);
            return CreatedAtAction(nameof(FindById), new { jobID = created }, created);
        }

        [Authorize]
        [HttpPut("takejob/{jobID}")]
        public async Task<ActionResult<Job>> TakeJob([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
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
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
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
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
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

        [Authorize]
        [HttpPut("finishjob/{jobID}")]
        public async Task<ActionResult<Job>> FinishJob([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    return BadRequest("There is no such user with this Bearer");

                var job = await jobService.FinishJob(jobID);
                return CreatedAtAction(nameof(FindById), new { jobID = job.ID }, job);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize]
        [HttpDelete("deletejob/{jobID}")]
        public async Task<ActionResult<Job>> DeleteJob([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    return BadRequest("There is no such user with this Bearer");

                 await jobService.DeleteJob(jobID);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("asd")]
        public IReadOnlyList<DaysOfWeek> GetDay()
        {
            return new List<DaysOfWeek>() { DaysOfWeek.Sun, DaysOfWeek.Mon };
        }
    }
}
