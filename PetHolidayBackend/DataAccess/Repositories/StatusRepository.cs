using DataAccess.DataObjects;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class StatusRepository : IStatusRepository
    {
        private readonly PetHolidayDbContext dbcontext;

        public StatusRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Status> FindById(int statusID)
        {
            //var status = await dbcontext.Statuses.Where(s => s.ID == statusID).SingleAsync();
            var status = await dbcontext.Statuses.FindAsync(statusID);
            if (status == null)
                throw new Exception("Status doesnt exist");
            return ToModel(status);
        }

        private Status ToModel(DbStatus status)
        {
            return new Status() { ID = status.ID, Name=status.Name };
        }
    }
}
