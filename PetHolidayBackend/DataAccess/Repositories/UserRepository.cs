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
       
        public async Task<IReadOnlyCollection<User>> List()
        {
            return dbcontext.Users.Select(ToModel).ToList();
        }

        public async Task<User> FindByUserName(string username)
        {
            var q = from p in dbcontext.Users
                    where p.UserName == username
                    select p;

            var foundUser = q.FirstOrDefault();
            if (foundUser.Equals(null))
            {
                return null;
            }
            return ToModel(foundUser);
        }

        public async Task<User> Insert(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Delete(int userID)
        {
            throw new NotImplementedException();
        }
        public User ToModel(DbUser user)
        {
            return new User(user.FirstName, user.LastName, user.Age, user.Picture);
        }
    }
}
