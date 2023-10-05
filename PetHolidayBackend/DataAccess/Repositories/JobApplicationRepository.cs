using DataAccess.DataObjects;
using Domain.Common;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly PetHolidayDbContext dbcontext;

        public JobApplicationRepository(PetHolidayDbContext dbcontext)
        { 
            this.dbcontext = dbcontext;
        } 

        public async Task<JobApplication> InsertApplicationForJob(int jobID, int userID)
        {
            var job = await dbcontext.Jobs.Include(s => s.JobApplications).FirstOrDefaultAsync(s => s.ID == jobID) ?? throw new Exception("Job does not exist");
            if (job.JobApplications.Any(s => s.ApplicantUserID == userID))
                throw new Exception("You already applied for this job");

            var application = new DbJobApplication()
            {
                ApplicantUserID = userID,
                Job = job,
                IsApproved = false,
            };
      
            job.JobApplications.Add(application);
            job.Status = Status.Approving;

            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobApplicationModel(application);
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

        public async Task DeleteApplication(int applicationID)
        {
            var application = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application is not found");

            dbcontext.Remove(application);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<JobApplication>> GetAllForJob(int jobID)
        {
            var job = await dbcontext.Jobs.FindAsync(jobID) ?? throw new Exception("Requested job does not exist");

            return await dbcontext.JobApplications.Include(s => s.ApplicantUser).Include(s => s.Comments).Where(s => s.JobID == jobID).Select(s => ModelMapper.ToJobApplicationModel(s)).ToListAsync();
        }
    }
}
