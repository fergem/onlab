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
            /*if (!jobParameters.ValidOnce && jobParameters.ValidOnce)
                return BadRequest("Filter is not good");
            else if (!jobParameters.ValidRepeated && jobParameters.ValidRepeated)
                return BadRequest("Filter is not good");*/

            var result = await jobService.List(jobParameters);
            return Ok(result.Select(s => s.ToJobPreviewDTO()));
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("posted")]
        public async Task<ActionResult<IReadOnlyCollection<PostedJobDTO>>> ListRepeatablePostedJobs([FromQuery] JobFilterPosted filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");
            var result = await jobService.ListPostedJobs(userID, filter);
            return Ok(result.Select(s => s.ToPostedJobDTO()));
        }

        [Authorize(Roles = "PetSitter")]
        [HttpGet("undertook")]
        public async Task<ActionResult<IReadOnlyCollection<UndertookJobDTO>>> ListUndertookJobs([FromQuery] JobApplicationFilter filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");

            var result = await jobService.ListUnderTookJobs(userID, filter);
            return Ok(result.Select(s => s.ToUndertookJobDTO(userID)));
        }


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
                return NotFound(ex.Message);
            }
        }

        [Authorize(Roles = "Owner")]
        [HttpPost]
        public async Task<ActionResult<Job>> InsertJob([FromBody] InsertJobModel jobModel)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
            if (!foundUser)
                BadRequest("There is no such user with this Bearer");

            var created = await jobService.Insert(jobModel, userID);
            return CreatedAtAction(nameof(FindById), new { jobID = created.ToJobPreviewDTO() }, created);
        }

        [Authorize(Roles = "Owner")]
        [Authorize]
        [HttpPut("finishjob/{jobID}")]
        public async Task<ActionResult<JobDetailsDTO>> FinishJob([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
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


        [Authorize(Roles = "Owner")]
        [HttpDelete("canceljob/{jobID}")]
        public async Task<ActionResult<JobDetailsDTO>> CancelJob([FromRoute] int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("There is no such user with this Bearer");

                 var job = await jobService.CancelJob(jobID);
                return Ok(job.ToJobDetailsDTO());
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
