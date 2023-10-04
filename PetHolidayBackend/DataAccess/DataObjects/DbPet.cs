using Domain.Models;

namespace DataAccess.DataObjects
{
    public class DbPet
    {
        public DbPet()
        {
            Images = new HashSet<DbPetImage>();
            Jobs = new HashSet<DbPetJob>();

        }

        public int ID { get; set; }

        public required string Name { get; set; }
        public required PetSpecies Species { get; set; }

        public required int Age { get; set; }

        public required int UserID { get; set; }
        public virtual DbUser User { get; set; } = null!;

        public virtual ICollection<DbPetImage> Images { get; set;}
        public virtual ICollection<DbPetJob> Jobs { get; set; }
    }
}
