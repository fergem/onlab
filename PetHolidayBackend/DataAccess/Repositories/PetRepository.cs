using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.QueryHelpers;
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
            dbcontext.Remove(pet);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<Pet>> List(int userID, PetFilterParameters filter)
        {
            return await dbcontext.Pets
                .Include(s => s.Image)
                .Include(s => s.User)
                .Where(s => s.UserID == userID)
                .Select(s => ModelMapper.ToPetModel(s))
                .ToListAsync();
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

        public async Task<int> Insert(Pet pet, int userID)
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
            await dbcontext.SaveChangesAsync();
            return insertPet.ID;
        }

        public async Task<Pet> Update(Pet pet)
        {
            var dbPet = await dbcontext.Pets.FindAsync(pet.ID);
            if (dbPet == null)
                throw new Exception("Nincs ilyen pet");

            dbPet.Age = pet.Age;
            dbPet.Description = pet.Description;
            dbPet.Species = pet.Species;
            dbPet.Name = pet.Name;
            if (pet.Image is not null)
            {
                var dbPetImage = new DbPetImage
                {
                    Picture = pet.Image.Picture,
                    PetID = pet.ID,
                };
                dbPet.Image = dbPetImage;
                await dbcontext.PetImages.AddAsync(dbPetImage);

            }

            await dbcontext.SaveChangesAsync();
     
            return ModelMapper.ToPetModel(dbPet);
        }

        public async Task<Pet> AddImage(int ID, byte[] file)
        {
            var dbPet = await dbcontext.Pets.Include(s => s.Image).FirstOrDefaultAsync(s => s.ID == ID);
            if (dbPet == null)
                throw new Exception("Nincs ilyen pet");
            var dbImage = new DbPetImage()
            {
                PetID = dbPet.ID,
                Picture = file,
            };

            dbPet.Image = dbImage;
            await dbcontext.PetImages.AddAsync(dbImage);
            await dbcontext.SaveChangesAsync();
            return ModelMapper.ToPetModel(dbPet);
        }
    }
}
