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

        public async Task<JobApplication> GetById(int applicationID)
        {
            var application = await dbcontext.JobApplications.Include(s => s.ApplicantUser).FirstOrDefaultAsync(s => s.ID == applicationID) ?? throw new Exception("No such application");
            return ModelMapper.ToJobApplicationModel(application);
        }

        public async Task<IReadOnlyCollection<JobApplication>> GetAllForJob(Job job)
        {
            return await dbcontext.JobApplications
                .Include(s => s.ApplicantUser)
                .Include(s => s.Comments)
                .Where(s => s.JobID == job.ID)
                .Select(s => ModelMapper.ToJobApplicationModel(s)).ToListAsync();
        }

        public async Task<JobApplication> InsertApplicationForJob(Job job,int userID)
        {
            var user = await dbcontext.Users.FindAsync(userID) ?? throw new Exception("User not found");
            var application = new DbJobApplication()
            {
                ApplicantUser = user,
                JobID = job.ID,
                IsApproved = false,
            };

            await dbcontext.JobApplications.AddAsync(application);
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
        
        public async Task TerminateApplication(int applicationID)
        {
            var application = await dbcontext.JobApplications.FindAsync(applicationID) ?? throw new Exception("Application is not found");

            dbcontext.Remove(application);
            await dbcontext.SaveChangesAsync();
        }
    }
}
