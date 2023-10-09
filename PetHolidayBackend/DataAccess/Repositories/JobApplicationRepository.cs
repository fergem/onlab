using Domain.Models;
using Domain.Common;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;


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
                IsApproved = false,
            };

            await dbcontext.JobApplications.AddAsync(application);
            await dbcontext.SaveChangesAsync();

            return application;
        }

        public async Task ApproveApplication(int applicationID)
        {
            var application = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application does not exist");
              
            var jobOfApplication = await dbcontext.Jobs.Include(s => s.JobApplications).FirstOrDefaultAsync(s => s.ID == application.JobID) ?? throw new Exception("Job does not exist");
               
            if (jobOfApplication.JobApplications.Any(s => s.IsApproved))
                throw new Exception("Job already has an approved application");

            application.IsApproved = true;
            jobOfApplication.Status = Status.Upcoming;
            await dbcontext.SaveChangesAsync(); 
        }
        
        public async Task CancelApplication(int applicationID)
        {
            var application = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application is not found");

            dbcontext.Remove(application);
            await dbcontext.SaveChangesAsync();
        }
    }
}
