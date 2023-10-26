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
        public async Task<IReadOnlyCollection<JobApplication>> GetAllForUser(int userID, JobApplicationFilter filter)
        {

            return await dbcontext.JobApplications
                 .Include(s => s.Job)
                 .ThenInclude(s => s.OwnerUser)
                 .Include(s => s.Comments)
                 .Include(s => s.ApplicantUser)
                 .Where(s => s.ApplicantUserID == userID)
                 .Where(s => filter.JobStatus != Status.All ? s.Job.Status == filter.JobStatus : true)
                 .Where(s => filter.ApplicationStatus != JobApplicationStatus.All ? s.Status == filter.ApplicationStatus : true)
                 .OrderByDescending(s => s.Comments.Max(c => c.CommentDate)) 
                 .ToListAsync();
        }

        public async Task<JobApplication> InsertApplicationForJob(int jobID,int userID)
        {
            var user = await dbcontext.Users.FindAsync(userID) ?? throw new Exception("User not found");
            var job = await dbcontext.Jobs.FindAsync(jobID) ?? throw new Exception("Job not found");
            var application = new JobApplication()
            {
                ApplicantUserID = user.Id,
                JobID = job.ID,
                Status = JobApplicationStatus.Approving,
            };

            await dbcontext.JobApplications.AddAsync(application);
            await dbcontext.SaveChangesAsync();

            return application;
        }

        public async Task ApproveApplication(int applicationID)
        {
            var application = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application does not exist");
              
            var jobOfApplication = await dbcontext.Jobs.Include(s => s.JobApplications).FirstOrDefaultAsync(s => s.ID == application.JobID) ?? throw new Exception("Job does not exist");
               
            if (jobOfApplication.JobApplications.Any(s => s.Status == JobApplicationStatus.Approved))
                throw new Exception("Job already has an approved application");

            application.Status = JobApplicationStatus.Approved;
            jobOfApplication.Status = Status.Upcoming;

            foreach (var item in jobOfApplication.JobApplications.Where(s => s.ID != applicationID))
            {
                item.Status = JobApplicationStatus.NotApproved;
            }

            await dbcontext.SaveChangesAsync(); 
        }

        public async Task NotApproveApplication(int applicationID)
        {
            var application = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application is not found");
            application.Status = JobApplicationStatus.NotApproved;
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
