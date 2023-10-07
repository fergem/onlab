using Domain.Models;
using Domain.Common.InsertModels;
using Domain.Common.UpdateModels;
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

        public async Task<Pet> FindById(int petID)
        {
            var result = await dbcontext.Pets.FirstOrDefaultAsync(s => s.ID == petID) ?? throw new Exception("Requested pet not exists");
            return result;
        }

        public async Task Delete(int petID)
        {
            var pet = await dbcontext.Pets.FindAsync(petID);
            if (pet == null)
                throw new Exception("Pet wanted to be deleted doesnt exists");
           // dbcontext.Remove(pet);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<Pet>> List(int userID)
        {
            return await dbcontext.Pets
                .Include(s => s.Images)
                .Include(s => s.User)
                .Where(s => s.UserID == userID)
                .ToListAsync();
        }

        public async Task<Pet> Insert(InsertPetModel pet, int userID)
        {
            var insertPet = new Pet()
            {
                Name = pet.Name,
                Species = pet.Species,
                Age = pet.Age,
                UserID = userID
            };
            
            await dbcontext.Pets.AddAsync(insertPet);
            await dbcontext.SaveChangesAsync();
            return insertPet;
        }

        public async Task<Pet> Update(UpdatePetModel pet)
        {
            var dbPet = await dbcontext.Pets.FindAsync(pet.ID);
            if (dbPet == null)
                throw new Exception("Pet not found");

            dbPet.Age = pet.Age;
            dbPet.Name = pet.Name;

            await dbcontext.SaveChangesAsync();
            return dbPet;
        }

        public async Task<Pet> InsertImages(int ID, UpdatePetImagesModel addPetImagesModel)
        {
            var dbPet = await dbcontext.Pets.Include(s => s.Images).FirstOrDefaultAsync(s => s.ID == ID);
            if (dbPet == null)
                throw new Exception("Nincs ilyen pet");
            var dbImagesToAdd = new List<PetImage>();
            foreach (var image in addPetImagesModel.files)
            {
                dbImagesToAdd.Add(new PetImage
                {
                    Picture = image,
                });
            }
            await dbcontext.AddRangeAsync(dbImagesToAdd);
            dbPet.Images = dbImagesToAdd;

            await dbcontext.PetImages.AddRangeAsync(dbImagesToAdd);
            await dbcontext.SaveChangesAsync();
            return dbPet;
        }
    }
}
