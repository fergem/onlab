namespace DataAccess.DataObjects
{
    public class DbPet
    {
        public DbPet()
        {
            //Images = new HashSet<DbPetImage>();
        }

        public int ID { get; set; }

        public required string Name { get; set; }

        public required string Description { get; set; }

        public required string Species { get; set; }

        public required int Age { get; set; }

        public required int UserID { get; set; }
        public virtual DbUser User { get; set; } = null!;
        //public virtual ICollection<DbPetImage> Images { get; set; }
        public virtual DbPetImage Image { get; set;}
    }
}
