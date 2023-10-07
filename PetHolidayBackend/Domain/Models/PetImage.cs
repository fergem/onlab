namespace Domain.Models
{
    public class PetImage
    {
        public int ID { get; set; }
        public required byte[] Picture { get; set; }

        public int PetID { get; set; }
        public virtual Pet Pet { get; set; } = null!;
    }
}
