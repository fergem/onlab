using DataAccess.DataObjects;
using Domain.Models;
using Domain.Repositories;
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
            var job = await dbcontext.Jobs.FindAsync(jobID);
            if (job is null)
                throw new Exception("Job does not exist");


            var application = new DbJobApplication()
            {
                ApplicantUserID = userID,
                Job = job,
                IsApproved = false,
            };

            job.JobApplications.Add(application);
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobApplicationModel(application);
        }

        public Task ApproveApplication(int jobID, int userID)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteApplication(int applicationID)
        {
            var application = await dbcontext.Jobs.FindAsync(applicationID);
            if (application is null) throw new Exception("Application is not found");ű

            dbcontext.Remove(application);
            await dbcontext.SaveChangesAsync();
        }
    }
}
