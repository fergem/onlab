
using Domain.Common;

namespace Domain.Models
{
    public class Pet
    {
        public Pet()
        {
            Images = new HashSet<PetImage>();
            Jobs = new HashSet<PetJob>();

        }

        public int ID { get; set; }

        public required string Name { get; set; }
        public required PetSpecies Species { get; set; }

        public required int Age { get; set; }

        public required int UserID { get; set; }
        public virtual User User { get; set; } = null!;

        public virtual ICollection<PetImage> Images { get; set;}
        public virtual ICollection<PetJob> Jobs { get; set; }
    }
}
