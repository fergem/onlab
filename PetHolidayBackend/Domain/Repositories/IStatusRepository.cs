using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IStatusRepository
    {
        //Task<IReadOnlyCollection<Pet>> List();
        Task<Status> FindByName(Status name);
        //Task<Status> Update(Status status);
    }
}
