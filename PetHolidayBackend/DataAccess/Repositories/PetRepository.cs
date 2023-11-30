using Domain.Models;
using Domain.Common.InsertModels;
using Domain.Common.UpdateModels;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Domain.Common;
using System.Drawing;

namespace DataAccess.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly PetHolidayDbContext dbcontext;
        public PetRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Pet> FindById(int petID)
        {
            var result = await dbcontext.Pets
                .FirstOrDefaultAsync(s => s.ID == petID) ?? throw new Exception("Requested pet not exists");
            return result;
        }

        public async Task Delete(int petID)
        {
            var pet = await dbcontext.Pets.FindAsync(petID);
            if (pet is null)
                throw new Exception("Pet wanted to be deleted doesnt exists");
            dbcontext.Remove(pet);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<Pet>> List(int userID)
        {
            return await dbcontext.Pets
                .Include(s => s.User)
                .Where(s => s.UserID == userID)
                .ToListAsync();
        }

        public async Task<Pet> Insert(InsertPetModel pet, byte[]? image, int userID)
        {
            var insertPet = new Pet()
            {
                Name = pet.Name,
                Species = pet.Species,
                Age = pet.Age,
                UserID = userID,
                Image = image,
            };
            
            await dbcontext.Pets.AddAsync(insertPet);
            await dbcontext.SaveChangesAsync();
            return insertPet;
        }

        public async Task<Pet> Update(UpdatePetModel pet, byte[]? image)
        {
            var dbPet = await dbcontext.Pets.FindAsync(pet.ID);
            if (dbPet == null)
                throw new Exception("Pet not found");

            if(pet.Age is not 0)
                dbPet.Age = pet.Age;
            if(pet.Name is not null)
                dbPet.Name = pet.Name;
            if(image is not null)
                dbPet.Image = image;

            if (pet.Species is not null)
            {
                dbPet.Species = (PetSpecies)pet.Species;
            }

            await dbcontext.SaveChangesAsync();
            return dbPet;
        }
    }
}
