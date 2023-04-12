using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DataObjects;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;

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
            var pet = await dbcontext.Pets.FindAsync(petID);
            if (pet == null)
                throw new Exception("Pet wanted to be deleted doesnt exists");
            dbcontext.Remove(pet);
            await dbcontext.SaveChangesAsync();
            return ModelMapper.ToPetModel(pet);
        }

        public async Task<IReadOnlyCollection<Pet>> List()
        {
            return await dbcontext.Pets.Select(s => ModelMapper.ToPetModel(s)).ToListAsync();
        }

        public async Task<Pet> FindById(int petID)
        {
            var pet = await dbcontext.Pets.FindAsync(petID);
            if(pet == null) 
            {
                throw new Exception("Pet doesnt exist");
            }
            return ModelMapper.ToPetModel(pet);
        }

        public async Task<Pet> Insert(Pet pet, int userID)
        {
            var insertPet = new DbPet()
            {
                Name = pet.Name,
                Species = pet.Species,
                Description = pet.Description,
                Age = pet.Age,
                UserID = userID
            };
            await dbcontext.Pets.AddAsync(insertPet);
            dbcontext.SaveChanges();
            return ModelMapper.ToPetModel(insertPet);
        }        
    }
}
