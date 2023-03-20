using DataAccess.DataObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class DataSeeder
    {
        private readonly PetHolidayDbContext petHolidayDbContext;

        public DataSeeder(PetHolidayDbContext petHolidayDbContext)
        {
            this.petHolidayDbContext = petHolidayDbContext;
        }

        public void Seed()
        {
            if (!petHolidayDbContext.Pets.Any() && !petHolidayDbContext.Users.Any())
            {
                var pets = new List<DbPet>()
                {
                        new DbPet() { Name = "Vakarcs", Description = "Szep kutya", Species = "Kutya", Age = 7, UserID = "1" }
                };

                /*var users = new List<DbUser>()
                {
                    new DbUser() { Id = "b74ddd14-6340-4840-95c2-db12554843e5",
                UserName = "Admin", FirstName = "Kiss", LastName = "Janos", Age = 23}
                };*/

                petHolidayDbContext.Pets.AddRange(pets);
                //petHolidayDbContext.Users.AddRange(users);
                petHolidayDbContext.SaveChanges();
            }
        }
    }
}
