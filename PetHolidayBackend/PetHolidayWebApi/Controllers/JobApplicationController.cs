using DataAccess.Repositories;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PetHolidayWebApi.Controllers
{
    [Route("api/jobapplications")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
       
        private readonly JobApplicationService jobApplicationService;
        private readonly AuthService authService;

        public JobApplicationController(JobApplicationService jobApplicationService, AuthService authService)
        {
            this.jobApplicationService = jobApplicationService;
            this.authService = authService;
        }


        [Authorize]
        [HttpGet("{jobID}")]
        public async Task<ActionResult<IReadOnlyCollection<JobApplication>>> GetAllForJob(int jobID)
        {
            try
            {
                return Ok(await jobApplicationService.GetAllForJob(jobID));//.ConfigureAwait(false);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost("{jobID}")]
        public async Task<ActionResult<JobApplication>> InsertApplicationForJob(int jobID)
        {
            var foundUser = Int32.TryParse(HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == "ID")?.Value, out var userID);
            if (!foundUser)
                return BadRequest("There is no such user with this Bearer");

            try
            {
                return Ok(await jobApplicationService.InsertApplicationForJob(jobID, userID));
            }
            catch (Exception ex)
            {
                return BadRequest();
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
                return BadRequest();
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
                return BadRequest();
            }
        }

    }
}
