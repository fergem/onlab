using DataAccess.Repositories;
using Domain.Common.InsertModels;
using Domain.Common.QueryHelpers;
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
        private readonly IHubContext<JobApplicationCommentHub> hub;

        public JobApplicationController(JobApplicationService jobApplicationService, AuthService authService, IHubContext<JobApplicationCommentHub> hub)
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
            return Ok(result.Select(s => s.ToJobApplicationDTO()));
        }

        [Authorize(Roles = "PetSitter")]
        [HttpGet("appliedto")]
        public async Task<ActionResult<IReadOnlyCollection<JobApplicationChatDTO>>> GetAllForUser([FromQuery] JobFilterApplied filter)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");

            var result = await jobApplicationService.GetAllForUser(userID, filter);
            return Ok(result.Select(s => s.ToJobApplicationUserAppliedToDTO()));
        }



        [Authorize(Roles = "PetSitter")]
        [HttpPost("{jobID}")]
        public async Task<ActionResult<JobApplicationDTO>> InsertApplicationForJob(int jobID)
        {
            try
            {
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");
                var result = await jobApplicationService.InsertApplicationForJob(jobID, userID);

                return Ok(result.ToJobApplicationDTO());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       
        [Authorize]
        [HttpPatch("{applicationID}/cancel")]
        public async Task<ActionResult> CancelApplication(int applicationID)
        {
            try
            {
                await jobApplicationService.CancelApplication(applicationID);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize(Roles = "Owner")]
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
                var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "Id")?.Value, out var userID);
                if (!foundUser)
                    throw new Exception("User not found");

                var result = await jobApplicationService.InsertApplicationComment(model, userID);
                await hub.Clients.Group(model.ApplicationID.ToString()).SendAsync("CommentAdded");
                return Ok(result.ToJobApplicationCommentDTO());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
