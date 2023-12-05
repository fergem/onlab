using Domain.Models;
using Domain.Common;
using Domain.Common.InsertModels;
using Domain.Common.QueryHelpers;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
            var job = await dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.Pets)
                .ThenInclude(s=> s.Pet)
                .FirstOrDefaultAsync(s => s.ID == jobID);

            if (job == null)
                throw new Exception("Job doesnt exist");
            return job;
        }


        public async Task CancelJobIfNotAvailable(int jobApplcationID)
        {
            var job = await dbcontext.Jobs.Include(s => s.JobApplications).FirstOrDefaultAsync(s => s.JobApplications.Any(s => s.ID == jobApplcationID));
            if (job == null)
                throw new Exception("Job doesnt exist");

            if(job.Status != Status.Available)
            {
                job.Status = Status.Canceled;
                await dbcontext.SaveChangesAsync();
            }
        }

        public async Task<Job> Insert(InsertJobModel job, int userID)
        {
            var petsToAdd = await dbcontext.Pets.Where(s => job.PetIDs.Any(c => c == s.ID)).ToListAsync();
            if (petsToAdd.Count != job.PetIDs.Count)
                throw new Exception("One of the pet ID is not valid");

            var userToAdd = await dbcontext.Users.FindAsync(userID);

            var insertJob = new Job()
            {
                Location = job.Location,
                Description = job.Description,
                OwnerUserID = userID,
                Payment = job.Payment,
                MinRequiredExperience = job.MinRequiredExperience,
                Repeated = job.Repeated,
                StartDate = job.StartDate,
                EndDate = job.EndDate,
                Status = Status.Available,
                Days = job.Days,
                Title = job.Title,
                Type = job.JobType,
            };

            var petJobs = new List<PetJob>();
            foreach (var pet in petsToAdd)
                petJobs.Add(new PetJob() { Pet = pet, Job = insertJob });

            await dbcontext.Jobs.AddAsync(insertJob);
            await dbcontext.PetJobs.AddRangeAsync(petJobs);
            await dbcontext.SaveChangesAsync();

            return insertJob;
        }

        public async Task<PagedList<Job>> List(JobFilter filter)
        {
            IQueryable<Job> query = dbcontext.Jobs
                    .Include(s => s.OwnerUser)
                    .Include(s => s.Pets)
                    .ThenInclude(s => s.Pet)
                    .Where(s => s.Repeated == filter.Repeated)
                    .Where(s => s.Status == Status.Available)
                    .Where(s => s.StartDate >= filter.StartDate)
                    .OrderBy(s => s.StartDate);

            if(filter.EndDate is not null)
                query = query.Where(job => job.EndDate != null && job.EndDate <= filter.EndDate);

            if(filter.Types is not null && filter.Types.Count > 0)
                query = query.Where(job => filter.Types.Contains(job.Type));    

            if (filter.Species is not null && filter.Species.Count > 0) 
                query = query.Where(job => job.Pets.Any(petJob => filter.Species.Contains(petJob.Pet.Species)));

            if (filter.Repeated && filter.Days is not null) 
            {
                var filteredDays = query.ToList()
                   .Where(s => s.Days != null && s.Days.All(day => filter.Days.Contains(day)))
                   .Select(s => s.ID)
                   .ToList();
                query = query.Where(s => filteredDays.Contains(s.ID));
            }
   
            return await PagedList<Job>.ToPagedList(query, filter.PageNumber, filter.PageSize);
        }

        public async Task<PagedList<Job>> ListPostedJobs(int userID, JobFilterPosted filter)
        {
            return await PagedList<Job>.ToPagedList(dbcontext.Jobs
                .Include(s => s.Pets)
                .ThenInclude(s => s.Pet)
                .Include(s => s.JobApplications)
                .ThenInclude(s => s.ApplicantUser)
                .ThenInclude(s => s.PetSitterProfile)
                .Include(s => s.JobApplications)
                .ThenInclude(s => s.Comments)
                .Where(s => s.OwnerUserID == userID)
                .Where(s => filter.Status != Status.All ? s.Status == filter.Status : true)
                .Where(s => filter.Repeated != null ? s.Repeated == filter.Repeated : true)
                .OrderBy(s => s.StartDate), filter.PageNumber, filter.PageSize);
        }

        public async Task<PagedList<Job>> ListAppliedJobs(int userID, JobFilterApplied filter)
        {
            return await PagedList<Job>.ToPagedList(dbcontext.Jobs
                .Include(s => s.OwnerUser)
                .Include(s => s.Pets)
                .ThenInclude(s => s.Pet)
                .Include(s => s.JobApplications)
                .ThenInclude(s => s.Comments)
                .Include(s => s.JobApplications)
                .ThenInclude(s => s.ApplicantUser)
                .Where(s => s.JobApplications.Any(s => s.ApplicantUserID == userID))
                .Where(s => filter.Status != Status.All ? s.Status == filter.Status : true)
                .Where(s => filter.JobApplicationStatus != JobApplicationStatus.All ? s.JobApplications.FirstOrDefault(k => k.ApplicantUserID == userID)!.Status == filter.JobApplicationStatus : true)
                .OrderBy(s => s.StartDate),
                filter.PageNumber,filter.PageSize);
        }

        public async Task<Job> ProgressJob(int jobID, Status status)
        {
            var jobToProgress = await dbcontext.Jobs
               .Include(s => s.OwnerUser)
               .Include(s => s.JobApplications)
               .FirstAsync(s => s.ID == jobID);

            if (jobToProgress is null)
                throw new Exception($"There is no such job that you want to progress to status: {status}");

            jobToProgress.Status = status;

            await dbcontext.SaveChangesAsync();
            return jobToProgress;
        }

        public async Task CancelJobsDependentOnPet(int petID)
        {
            var dbPet = await dbcontext.Pets.FirstOrDefaultAsync(s=> s.ID == petID);
            if (dbPet is null)
                throw new Exception("Pet not found");

            var jobs = await dbcontext.Jobs
                .Include(s => s.Pets)
                .ThenInclude(s => s.Pet)
                .Where(s => s.Pets.Any(s => s.PetID == petID)).ToListAsync();

            if(jobs.Any())
            {
                foreach (var job in jobs)
                {
                    job.Status = Status.Canceled;
                }
                await dbcontext.SaveChangesAsync();
            }
        }
    } 
}
