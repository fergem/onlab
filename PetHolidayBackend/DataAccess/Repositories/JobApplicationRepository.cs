using Domain.Models;
using Domain.Common;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Domain.Common.QueryHelpers;

namespace DataAccess.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly PetHolidayDbContext dbcontext;

        public JobApplicationRepository(PetHolidayDbContext dbcontext)
        { 
            this.dbcontext = dbcontext;
        }

        public async Task<JobApplication> GetById(int applicationID)
        {
            var application = await dbcontext.JobApplications
                                .Include(s => s.ApplicantUser)
                                .Include(s => s.Comments)
                                .FirstOrDefaultAsync(s => s.ID == applicationID) ?? throw new Exception("No such application");
            return application;
        }

        public async Task<IReadOnlyCollection<JobApplication>> GetAllForJob(Job job)
        {
            return await dbcontext.JobApplications
                .Include(s => s.ApplicantUser)
                .Include(s => s.Comments)
                .Where(s => s.JobID == job.ID)
                .OrderByDescending(s => s.Comments.Max(c => c.CommentDate))
                .ToListAsync();
        }
        public async Task<IReadOnlyCollection<JobApplication>> GetAllForUser(int userID, JobFilterApplied filter)
        {

            return await dbcontext.JobApplications
                 .Include(s => s.Job)
                 .ThenInclude(s => s.OwnerUser)
                 .Include(s => s.Comments)
                 .Include(s => s.ApplicantUser)
                 .Where(s => s.ApplicantUserID == userID)
                 .Where(s => filter.Status != Status.All ? s.Job.Status == filter.Status : true)
                 .Where(s => filter.JobApplicationStatus != JobApplicationStatus.All ? s.Status == filter.JobApplicationStatus : true)
                 .OrderByDescending(s => s.Comments.Max(c => c.CommentDate)) 
                 .ToListAsync();
        }

        public async Task<JobApplication> InsertApplicationForJob(int jobID,int userID)
        {
            var user = await dbcontext.Users.FindAsync(userID) ?? throw new Exception("User not found");
            var job = await dbcontext.Jobs.Include(s => s.JobApplications).FirstOrDefaultAsync(s => s.ID == jobID) ?? throw new Exception("Job not found");
            if(job.Status != Status.Available)
            {
                throw new Exception("Job is not available");
            }
            var jobApplication = job.JobApplications.FirstOrDefault(s => s.ApplicantUserID == user.Id);

            if (jobApplication == null)
            {
                var newApplication = new JobApplication()
                {
                    ApplicantUserID = user.Id,
                    JobID = job.ID,
                    Status = JobApplicationStatus.Approving,
                };

                await dbcontext.JobApplications.AddAsync(newApplication);
                await dbcontext.SaveChangesAsync();

                return newApplication;
            }
            jobApplication.Status = JobApplicationStatus.Approving;
            await dbcontext.SaveChangesAsync();

            return jobApplication;
        }

        public async Task ApproveApplication(int applicationID)
        {
            var selectedApplication = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application does not exist");
              
            var jobOfApplication = await dbcontext.Jobs.Include(s => s.JobApplications).FirstOrDefaultAsync(s => s.ID == selectedApplication.JobID) ?? throw new Exception("Job does not exist");
            if (jobOfApplication.Status != Status.Available)
                throw new Exception("Job status must be available to approve applicaton");
            if (jobOfApplication.JobApplications.Any(s => s.Status == JobApplicationStatus.Approved))
                throw new Exception("Job already has an approved application");

            selectedApplication.Status = JobApplicationStatus.Approved;
            jobOfApplication.Status = Status.Upcoming;

            var notSelectedApplications = jobOfApplication.JobApplications.Where(s => s.ID != applicationID);
            foreach (var application in notSelectedApplications)
            {
                application.Status = JobApplicationStatus.NotApproved;
            }

            await dbcontext.SaveChangesAsync(); 
        }
         
        public async Task CancelApplication(int applicationID)
        {
            var application = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application is not found");
            application.Status = JobApplicationStatus.Canceled;
            await dbcontext.SaveChangesAsync();
        }
    }
}
