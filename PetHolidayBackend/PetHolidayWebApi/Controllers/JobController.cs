using Domain.Common;
using Domain.Common.InsertModels;
using Domain.Common.QueryHelpers;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PetHolidayWebApi.DTOs;
using PetHolidayWebApi.ModelExtensions;
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
        public async Task<ActionResult<IReadOnlyCollection<JobPreviewDTO>>> List([FromQuery] JobFilter jobParameters)
        {
            if (!jobParameters.ValidOnce && jobParameters.ValidOnce)
                return BadRequest("Filter is not good");
            else if (!jobParameters.ValidRepeated && jobParameters.ValidRepeated)
                return BadRequest("Filter is not good");

            var result = await jobService.List(jobParameters);
            return Ok(result.Select(s => s.ToJobDetailsDTO()));
        }

        [Authorize]
        [HttpGet("posted")]
        public async Task<ActionResult<IReadOnlyCollection<JobPreviewDTO>>> ListPostedJobs([FromQuery] JobFilterParticipant filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            var result = await jobService.ListPostedJobs(userID, filter);
            return Ok(result.Select(s => s.ToJobDetailsDTO()));
        }

        [Authorize]
        [HttpGet("undertook")]
        public async Task<ActionResult<IReadOnlyCollection<JobPreviewDTO>>> ListUndertookJobs([FromQuery] JobFilterParticipant filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");

            var result = await jobService.ListUnderTookJobs(userID, filter);
            return Ok(result.Select(s => s.ToJobDetailsDTO()));
        }

        /*[Authorize]
        [HttpGet("approvals")]
        public async Task<ActionResult<IReadOnlyCollection<Job>>> ListApprovals()
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            return Ok(await jobService.ListApprovals(userID));
        }*/

        [HttpGet("{jobID}")]
        public async Task<ActionResult<JobDetailsDTO>> FindById([FromRoute] int jobID) 
        {
            try
            {

                var result = await jobService.FindById(jobID);
                return result.ToJobDetailsDTO();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Job>> InsertJob([FromBody] InsertJobModel jobModel)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                BadRequest();

            var created = await jobService.Insert(jobModel, userID);
            return CreatedAtAction(nameof(FindById), new { jobID = created }, created);
        }

        /*[Authorize]
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
        */
        /*[Authorize]
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
        }*/
        /*[Authorize]
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
        }*/

        [Authorize]
        [HttpPut("finishjob/{jobID}")]
        public async Task<ActionResult<JobDetailsDTO>> FinishJob([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    return BadRequest("There is no such user with this Bearer");

                var job = await jobService.FinishJob(jobID);
                return Ok(job.ToJobDetailsDTO());
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }


        [Authorize]
        [HttpDelete("deletejob/{jobID}")]
        public async Task<ActionResult> DeleteJob([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                 await jobService.DeleteJob(jobID);
                return Ok();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
