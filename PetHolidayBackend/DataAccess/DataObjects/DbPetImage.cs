namespace DataAccess.DataObjects
{
    public class DbPetImage
    {
        public int ID { get; set; }

        public int PetID { get; set; }
        public virtual DbPet Pet { get; set; } = null!;
        public byte[]? Picture { get; set; }
    }
}
