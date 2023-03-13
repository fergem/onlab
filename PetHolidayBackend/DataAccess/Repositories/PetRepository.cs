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
        public PetRepository(PetHolidayDbContext _context)
        {
            dbcontext = _context;
        }
        public Pet Delete(int petID)
        {
            throw new NotImplementedException();
        }

        public IReadOnlyCollection<Pet> List()
        {
            return dbcontext.Pets.Select(ToModel).ToList();
        }

        public Pet FindById(int petID)
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

        public Pet Insert(Pet pet)
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

        public Pet Update(Pet pet)
        {
            throw new NotImplementedException();
        }

        public Pet ToModel(DbPet pet)
        {
            return new Pet(pet.ID, pet.Name, pet.Description, pet.Species, pet.Age);
        }
    }
}
