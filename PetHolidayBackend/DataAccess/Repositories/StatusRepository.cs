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

        public async Task<Status> FindByName(StatusName name)
        {
            var status = await dbcontext.Statuses.FirstOrDefaultAsync(s => s.Name == name);
            if (status == null)
                throw new Exception("Status doesnt exist");
            return ModelMapper.ToStatusModel(status);
        }
    }
}
