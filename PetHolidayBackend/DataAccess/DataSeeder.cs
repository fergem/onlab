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
        private readonly PetHolidayDbContext employeeDbContext;

        public DataSeeder(PetHolidayDbContext employeeDbContext)
        {
            this.employeeDbContext = employeeDbContext;
        }

        public void Seed()
        {
            if (!employeeDbContext.Pets.Any())
            {
                var pets = new List<DbPet>()
                {
                        new DbPet() { Name = "Vakarcs", Description = "Szep kutya", Species = "Kutya", Age = 7 }
                };

                employeeDbContext.Pets.AddRange(pets);
                employeeDbContext.SaveChanges();
            }
        }
    }
}
