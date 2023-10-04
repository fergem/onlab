using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DataObjects;
using Domain.Common.QueryHelpers;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using static System.Net.Mime.MediaTypeNames;

namespace DataAccess.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly PetHolidayDbContext dbcontext;
        public PetRepository(PetHolidayDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task Delete(int petID)
        {
            var pet = await dbcontext.Pets.FindAsync(petID);
            if (pet == null)
                throw new Exception("Pet wanted to be deleted doesnt exists");
           // dbcontext.Remove(pet);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<Pet>> List(int userID, PetFilterParameters filter)
        {
            return await dbcontext.Pets
                .Include(s => s.Images)
                .Include(s => s.User)
                .Where(s => s.UserID == userID)
                .Select(s => ModelMapper.ToPetModel(s))
                .ToListAsync();
        }

        public async Task<Pet> Insert(Pet pet, int userID)
        {
            var insertPet = new DbPet()
            {
                Name = pet.Name,
                Species = pet.Species,
                Age = pet.Age,
                UserID = userID
            };
            
            await dbcontext.Pets.AddAsync(insertPet);
            await dbcontext.SaveChangesAsync();
            return ModelMapper.ToPetModel(insertPet);
        }

        public async Task<Pet> Update(Pet pet)
        {
            var dbPet = await dbcontext.Pets.FindAsync(pet.ID);
            if (dbPet == null)
                throw new Exception("Pet not found");

            dbPet.Age = pet.Age;
            dbPet.Species = pet.Species;
            dbPet.Name = pet.Name;
            if (pet.Images is not null)
            {
                var dbImagesToAdd = new List<DbPetImage>();
                foreach (var image in pet.Images)
                {
                    dbImagesToAdd.Add(new DbPetImage
                    {
                        Picture = image,
                    });   
                }
                await dbcontext.AddRangeAsync(dbImagesToAdd);
                dbPet.Images = dbImagesToAdd;
            }

            await dbcontext.SaveChangesAsync();
            return ModelMapper.ToPetModel(dbPet);
        }

        public async Task<Pet> AddImages(int ID, List<byte[]> files)
        {
            var dbPet = await dbcontext.Pets.Include(s => s.Images).FirstOrDefaultAsync(s => s.ID == ID);
            if (dbPet == null)
                throw new Exception("Nincs ilyen pet");
            var dbImagesToAdd = new List<DbPetImage>();
            foreach (var image in files)
            {
                dbImagesToAdd.Add(new DbPetImage
                {
                    Picture = image,
                });
            }
            await dbcontext.AddRangeAsync(dbImagesToAdd);
            dbPet.Images = dbImagesToAdd;

            await dbcontext.PetImages.AddRangeAsync(dbImagesToAdd);
            await dbcontext.SaveChangesAsync();
            return ModelMapper.ToPetModel(dbPet);
        }
    }
}
