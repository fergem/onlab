using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DataObjects;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly PetHolidayDbContext dbcontext;
        public PetRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        public async Task<Pet> Delete(int petID)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyCollection<Pet>> List()
        {
            return dbcontext.Pets.Select(ToModel).ToList();
        }

        public async Task<Pet> FindById(int petID)
        {
            var q = from p in dbcontext.Pets 
                           where p.ID == petID
                           select p;
            
            var foundPet = q.FirstOrDefault();
            if (foundPet.Equals(null))
            {
                return null;
            }
            return ToModel(foundPet);
        }

        public async Task<Pet> Insert(Pet pet)
        {
            var insertPet = new DbPet()
            {
                Name = pet.Name,
                Species = pet.Species,
                Description = pet.Description,
                Age = pet.Age
            };

            dbcontext.Pets.Add(insertPet);
            dbcontext.SaveChanges();

            return ToModel(insertPet);
        }

        public async Task<Pet> Update(Pet pet)
        {
            throw new NotImplementedException();
        }

        public Pet ToModel(DbPet pet)
        {
            return new Pet(pet.ID, pet.Name, pet.Description, pet.Species, pet.Age);
        }

        public Task<User> FindUserById(int petID)
        {
            throw new NotImplementedException();
        }
    }
}
