using Microsoft.AspNetCore.Identity;


namespace Domain.Models
{
    public class User : IdentityUser<int>
    {
        public User() 
        {
            Pets = new HashSet<Pet>();
            JobAdvertisements = new HashSet<Job>();
            JobApplications = new HashSet<Job>();
        }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Password { get; set; }
        public int Age { get; set; }
        public byte[]? Picture { get; set; }
        public string? Location { get; set; }
        public string? Bearer { get; set; }

        public virtual OwnerProfile OwnerProfile { get; set; } = null!;
        public virtual PetSitterProfile PetSitterProfile { get; set; } = null!;
        
        public virtual ICollection<Pet> Pets { get; set; }
        public virtual ICollection<Job> JobAdvertisements { get; set; }
        public virtual ICollection<Job> JobApplications { get; set; }
    }
}
