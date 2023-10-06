using DataAccess.Repositories;
using Domain.Common.InsertModels;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PetHolidayWebApi.DTOs;
using PetHolidayWebApi.Hubs;
using PetHolidayWebApi.ModelExtensions;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/jobapplications")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
       
        private readonly JobApplicationService jobApplicationService;
        private readonly AuthService authService;
        private readonly IHubContext<JobApplicationHub> hub;

        public JobApplicationController(JobApplicationService jobApplicationService, AuthService authService, IHubContext<JobApplicationHub> hub)
        {
            this.jobApplicationService = jobApplicationService;
            this.authService = authService;
            this.hub = hub;
        }


        [Authorize]
        [HttpGet("{jobID}")]
        public async Task<ActionResult<IReadOnlyCollection<JobApplicationDTO>>> GetAllForJob(int jobID)
        {
            var result = await jobApplicationService.GetAllForJob(jobID);
            return Ok(result.Select(s => s.ToJobApplicationDTO()));//.ConfigureAwait(false);

        }

        [Authorize]
        [HttpPost("{jobID}")]
        public async Task<ActionResult<JobApplicationDTO>> InsertApplicationForJob(int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                return Ok(await jobApplicationService.InsertApplicationForJob(jobID, userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{applicationID}")]
        public async Task<ActionResult> DeleteApplication(int applicationID)
        {
            try
            {
                await jobApplicationService.DeleteApplication(applicationID);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("{applicationID}/approve")]
        public async Task<ActionResult> ApproveApplication(int applicationID)
        {
            try
            {
                await jobApplicationService.ApproveApplication(applicationID);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("comment")]
        public async Task<ActionResult<JobApplicationComment>> Comment([FromBody] InsertJobApplicationCommentModel model)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                var result = await jobApplicationService.InsertApplicationComment(model, userID);
                await hub.Clients.Group(model.ApplicationID.ToString()).SendAsync("CommentAdded");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
