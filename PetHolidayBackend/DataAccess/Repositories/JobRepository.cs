using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.QueryHelpers;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net.NetworkInformation;
using System.Text.Json.Serialization;

namespace DataAccess.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly PetHolidayDbContext dbcontext;
        public JobRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Job> FindById(int jobID)
        {
            var job = await dbcontext.Jobs.FindAsync(jobID);
            if (job == null)
                throw new Exception("Job doesnt exist");
            return ModelMapper.ToJobModel(job);
        }

        public async Task<Job> Insert(InsertJobModel job, int userID)
        {
            var ownerUser = await dbcontext.Users.FindAsync(userID);
            if (ownerUser == null)
                throw new Exception("User doesnt exists that wants to add a job");
            var availableStatus = await dbcontext.Statuses.FindAsync(1);
            if (availableStatus == null)
                throw new Exception("Available status doesnt exists");
            var petsToInsert = await dbcontext.Pets.Where(s => job.petIDs.Contains(s.ID)).ToListAsync();
            if (!petsToInsert.Any())
                throw new Exception("No pets to add job");

           

            var insertJob = new DbJob()
            {
                Hours = job.Hours,
                Location = job.Location,
                Description = job.Description,
                OwnerUserID = ownerUser.Id,
                OwnerUser = ownerUser,
                StatusID = 1,
                Status = availableStatus,
                Payment = job.Payment,
                MinRequiredExperience = job.MinRequiredExperience
               
            };

            var petJobs = new List<DbPetJob>();
            foreach (var pet in petsToInsert)
                petJobs.Add(new DbPetJob() { Pet = pet, Job = insertJob });

           
            await dbcontext.Jobs.AddAsync(insertJob);
            await dbcontext.PetJobs.AddRangeAsync(petJobs);
            dbcontext.SaveChanges();

            return ModelMapper.ToJobModel(insertJob);
        }

        public async Task<IReadOnlyCollection<Job>> List(JobParameters jobParameters)
        {
            if(jobParameters.JobStatus != null)
            {
                var dbStatus = await dbcontext
                .Statuses
                .FirstOrDefaultAsync(s => s.Name == (DbStatusName)Enum.Parse(typeof(DbStatusName), jobParameters.JobStatus.ToString()));
                if (dbStatus == null)
                    throw new Exception("Status doesnt exist");
                return await dbcontext.Jobs
                   .Include(s => s.Status)
                   .Include(s => s.OwnerUser)
                   .Include(s => s.PetSitterUser)
                   .Where(s => s.Hours >= jobParameters.MinHours && s.Hours <= jobParameters.MaxHours && s.Status.Name == dbStatus.Name)
                   .Select(s => ModelMapper.ToJobModel(s))
                   .ToListAsync();
            }
            
            
            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Where(s => s.Hours >= jobParameters.MinHours && s.Hours <= jobParameters.MaxHours)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListPostedJobs(int userID, JobParameters jobParameters)
        {
            if (jobParameters.JobStatus == StatusName.Empty)
            {
                return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Where(s => s.OwnerUserID == userID && s.Hours >= jobParameters.MinHours && s.Hours <= jobParameters.MaxHours)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
            }

            var dbStatus = await dbcontext
                .Statuses
                .FirstOrDefaultAsync(s => s.Name == (DbStatusName)Enum.Parse(typeof(DbStatusName), jobParameters.JobStatus.ToString()));
            if (dbStatus == null)
                throw new Exception("Status doesnt exist");
            
            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Where(s => s.OwnerUserID == userID && s.Hours >= jobParameters.MinHours && s.Hours <= jobParameters.MaxHours && s.Status.Name == dbStatus.Name)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }
        public async Task<IReadOnlyCollection<Job>> ListApprovals(int userID)
        {
            return await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .Where(s => s.OwnerUserID == userID && s.Status.Name == DbStatusName.WaitingForApproval && s.PetSitterUserID != null)
               .Select(s => ModelMapper.ToJobModel(s))
               .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Job>> ListUnderTookJobs(int userID)
        {

            return await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .Where(d => d.PetSitterUserID == userID)
                .Select(s => ModelMapper.ToJobModel(s))
                .ToListAsync();
        }

        public async Task<Job> TakeJob(int jobID, int userID)
        {

            var jobToTake = await dbcontext.Jobs
                .Include(s => s.Status)
                .Include(s => s.OwnerUser)
                .Include(s => s.PetSitterUser)
                .FirstAsync(s => s.ID == jobID);

            if (jobToTake == null)
                throw new Exception("There is no such job that you want to undertake");
            if (jobToTake.PetSitterUser != null)
                throw new Exception("Job is already taken");

            var userToTakeJob = await dbcontext.Users.FindAsync(userID);
            if (userToTakeJob == null)
                throw new Exception("There is no such user to take job");

            var waitinfForApprovalStatus = await dbcontext
                .Statuses
                .FirstOrDefaultAsync(s => s.Name == DbStatusName.WaitingForApproval);
            if (waitinfForApprovalStatus == null)
                throw new Exception("WaitingForApproval status doesnt exist");

            jobToTake.Status = waitinfForApprovalStatus;
            jobToTake.PetSitterUser = userToTakeJob;

            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToTake);
        }

        public async Task<Job> ApproveUser(int jobID)
        {
            var jobToApprove = await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToApprove == null)
                throw new Exception("There is no such job that you want to undertake");
            var inProgressStatus = await dbcontext
               .Statuses
               .FirstOrDefaultAsync(s => s.Name == DbStatusName.Inprogress);
            if (inProgressStatus == null)
                throw new Exception("Inprogress status doesnt exist");

            jobToApprove.Status = inProgressStatus;
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToApprove);
        }

        public async Task<Job> DeclineUser(int jobID)
        {
            var jobToDecline = await dbcontext.Jobs
               .Include(s => s.Status)
               .Include(s => s.OwnerUser)
               .Include(s => s.PetSitterUser)
               .FirstAsync(s => s.ID == jobID);

            if (jobToDecline == null)
                throw new Exception("There is no such job that you want to undertake");
            var availableStatus = await dbcontext
               .Statuses
               .FirstOrDefaultAsync(s => s.Name == DbStatusName.Available);
            if (availableStatus == null)
                throw new Exception("Available status doesnt exist");

            jobToDecline.Status = availableStatus;
            jobToDecline.PetSitterUser = null;
            await dbcontext.SaveChangesAsync();

            return ModelMapper.ToJobModel(jobToDecline);
        }
    } 
}
