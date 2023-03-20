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
    public class UserRepository : IUserRepository
    {
        private readonly PetHolidayDbContext dbcontext;
        public UserRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        public User ToModel(DbUser user)
        {
            return new User(Int32.Parse(user.Id), user.FirstName, user.LastName, user.Age, user.Picture);
        }
        public Task<IReadOnlyCollection<User>> List()
        {
            throw new NotImplementedException();
        }

        public async Task<User> FindById(int userID)
        {
            var q = from p in dbcontext.Users
                    where p.Id == userID.ToString()
                    select p;

            var foundUser = q.FirstOrDefault();
            if (foundUser.Equals(null))
            {
                return null;
            }
            return ToModel(foundUser);
        }

        public async Task<User> FindByName(string username)
        {
            throw new NotImplementedException();
        }

        public async Task<User> FindPetById(int petID)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Insert(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Delete(int userID)
        {
            throw new NotImplementedException();
        }
    }
}
