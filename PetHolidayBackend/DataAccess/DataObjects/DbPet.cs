namespace DataAccess.DataObjects
{
    public class DbPet
    {
        public DbPet()
        {
            //Images = new HashSet<DbPetImage>();
            Jobs = new HashSet<DbPetJob>();

        }

        public int ID { get; set; }

        public required string Name { get; set; }

        public required string Description { get; set; }

        public required string Species { get; set; }

        public required int Age { get; set; }

        public required int UserID { get; set; }
        public virtual DbUser User { get; set; } = null!;
        public virtual DbPetImage Image { get; set;}
        public virtual ICollection<DbPetJob> Jobs { get; set; }
    }
}
