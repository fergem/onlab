using Azure;
using DataAccess.DataObjects;
using Domain.Models;
using Domain.Models.AuthHelpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;

namespace DataAccess
{
    public class PetHolidayDbContext : IdentityDbContext<DbUser, IdentityRole<int>, int>
    {
        public PetHolidayDbContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<DbPet> Pets { get; set; }
        public DbSet<DbPetSitterProfile> SitterProfiles { get; set; }
        public DbSet<DbOwnerProfile> OwnerProfiles { get; set; }
        public DbSet<DbJob> Jobs { get; set; }
        public DbSet<DbPetImage> PetImages { get; set; }
        public DbSet<DbPetJob> PetJobs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RoleConfiguration());

            modelBuilder.Entity<DbUser>().Navigation(s => s.OwnerProfile).AutoInclude();
            modelBuilder.Entity<DbPetJob>().Navigation(s => s.Job).AutoInclude();
            modelBuilder.Entity<DbPetJob>().Navigation(s => s.Pet).AutoInclude();
            modelBuilder.Entity<DbPet>().Navigation(s => s.Images).AutoInclude();


            modelBuilder.Entity<DbPetJob>(entity =>
            {
                entity.ToTable("PetJob");
                entity.HasKey(s => new { s.PetID, s.JobID });
            });

            modelBuilder.Entity<DbOwnerProfile>(entity =>
            {
                entity.ToTable("OwnerProfiles");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
                entity.Property(s => s.MinWage);
                entity.Property(s => s.MinRequiredExperience);
            });

            modelBuilder.Entity<DbPetSitterProfile>(entity =>
            {
                entity.ToTable("PetSitterProfiles");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
                entity.Property(s => s.MaxWage);
                entity.Property(s => s.AcquiredExperience);
            });
              
            modelBuilder.Entity<DbPet>(entity =>
            {
                entity.ToTable("Pets");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Name).HasMaxLength(50).IsUnicode(unicode: true);
                entity.Property(s => s.Age);
                entity.Property(s => s.Species);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
            });

            var converter = new EnumCollectionJsonValueConverter<DaysOfWeek>();
            var comparer = new CollectionValueComparer<DaysOfWeek>();

            modelBuilder.Entity<DbJob>(entity =>
            {
                entity.ToTable("Jobs");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
                entity.Property(s => s.Hours);
                entity.Property(s => s.Location).HasMaxLength(50).IsUnicode(unicode: true);
                entity.Property(s => s.Days).IsRequired(false)
                                             .HasConversion(converter)
                                             .Metadata.SetValueComparer(comparer);
            });

            modelBuilder.Entity<DbPetImage>(entity =>
            {
                entity.ToTable("PetImages");
                entity.HasKey(s => s.ID);
            });
                
            //Relationship configuration
            OneToOneRelationshipConfiguration(modelBuilder);
            OneToManyRelationshipConfiguration(modelBuilder);
            ManyToManyRelationshipConfiguration(modelBuilder);
            //Data seeding
            DataSeeding(modelBuilder);
        }

        private void OneToManyRelationshipConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUser>()
                .HasMany(c => c.Pets)
                .WithOne(s => s.User)
                .IsRequired();

            modelBuilder.Entity<DbUser>()
                .HasMany(c => c.JobAdvertisements)
                .WithOne(s => s.OwnerUser)
                .HasForeignKey(e => e.OwnerUserID)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            modelBuilder.Entity<DbJob>()
                .HasOne(s => s.PetSitterUser)
                .WithMany(s => s.JobApplications)
                .HasForeignKey(s => s.PetSitterUserID);

            /*modelBuilder.Entity<DbUser>()
                .HasMany(c => c.JobApplications)
                .WithOne(s => s.PetSitterUser)
                .HasForeignKey(e => e.PetSitterUserID);*/

            modelBuilder.Entity<DbPet>()
                .HasMany(c => c.Images)
                .WithOne(s => s.Pet)
                .HasForeignKey(e => e.PetID)
                .IsRequired();
        }

        private void OneToOneRelationshipConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUser>()
                .HasOne(c => c.OwnerProfile)
                .WithOne(s => s.User)
                .HasForeignKey<DbOwnerProfile>(b => b.UserID);

            modelBuilder.Entity<DbUser>()
                .HasOne(c => c.PetSitterProfile)
                .WithOne(s => s.User)
                .HasForeignKey<DbPetSitterProfile>(b => b.UserID);

            /*modelBuilder.Entity<DbPet>()
                .HasOne(c => c.Image)
                .WithOne(s => s.Pet)
                .HasForeignKey<DbPetImage>(e => e.PetID);*/
        }

        private void ManyToManyRelationshipConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbPetJob>()
                .HasOne(s => s.Job)
                .WithMany(s => s.Pets)
                .HasForeignKey(s => s.JobID);

            modelBuilder.Entity<DbPetJob>()
                .HasOne(s => s.Pet)
                .WithMany(s => s.Jobs)
                .HasForeignKey(s => s.PetID);
        }

        public void DataSeeding(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            modelBuilder.Entity<DbUser>()
                .HasData(
                    new DbUser()
                    {
                        Id = 1,
                        UserName = "kissjanos",
                        FirstName = "Kiss",
                        LastName = "Janos",
                        Age = 23,
                        Password = "asd",
                        NormalizedUserName = "KISSJANOS",
                        PasswordHash = hasher.HashPassword(null, "asd"),
                        //FirstLogin = true
                    },
                    new DbUser()
                    {
                        Id = 2,
                        UserName = "nagyfero",
                        FirstName = "Nagy",
                        LastName = "Feró",
                        Age = 32,
                        Password = "asd",
                        NormalizedUserName = "NAGYFERO",
                        PasswordHash = hasher.HashPassword(null, "asd"),
                        //FirstLogin = true
                    },
                    new DbUser()
                    {
                        Id = 3,
                        UserName = "viccelek",
                        FirstName = "Vicc",
                        LastName = "Elek",
                        Age = 43,
                        Password = "asd",
                        NormalizedUserName = "VICCELEK",
                        PasswordHash = hasher.HashPassword(null, "asd"),
                        //FirstLogin = true
                    },
                    new DbUser()
                    {
                        Id = 4,
                        UserName = "makulatlan",
                        FirstName = "Maku",
                        LastName = "Látlan",
                        Age = 17,
                        Password = "asd",
                        NormalizedUserName = "MAKULATLAN",
                        PasswordHash = hasher.HashPassword(null, "asd"),
                        //FirstLogin = true
                    }
                );

            modelBuilder.Entity<DbPet>()
                .HasData(
                    new DbPet()
                    {
                        ID = 1,
                        Name = "Milio",
                        Description = "Milio, the seven-year-old dog, boasts a heartwarming mix of wisdom and playfulness, his tail wagging through years of cherished adventures and companionship. His loyal eyes and graying fur tell a tale of unwavering friendship and boundless joy.",
                        Species = PetSpecies.Dog,
                        Age = 7,
                        UserID = 1,
                    },
                    new DbPet()
                    {
                        ID = 2,
                        Name = "Randy",
                        Description = "Randy, the three-year-old cat, exudes youthful energy and curiosity in every graceful leap and stealthy pounce. With his sleek coat and bright, inquisitive eyes, he's a charming feline companion who brings a sense of enchantment to each day.",
                        Species = PetSpecies.Cat,
                        Age = 3,
                        UserID = 2,
                    },
                    new DbPet()
                    {
                        ID = 3,
                        Name = "Luna",
                        Description = "Luna, the two-year-old pup, radiates youthful exuberance, bringing endless energy and an infectious spirit to every moment. With her vibrant personality and sparkling eyes, she's a delightful and energetic companion for any adventure.",
                        Species = PetSpecies.Dog,
                        Age = 2,
                        UserID = 3,
                    },
                    new DbPet()
                    {
                        ID = 4,
                        Name = "Whiskers",
                        Description = "Whiskers, the three-year-old cat, exudes a graceful charm and inquisitive nature. With a glossy fur coat and sparkling eyes, Whiskers is a delightful feline companion who adds a touch of enchantment to every day.",
                        Species = PetSpecies.Cat,
                        Age = 3,
                        UserID = 2,
                    },
                    new DbPet()
                    {
                        ID = 5,
                        Name = "Rusty",
                        Description = "Rusty, the four-year-old dog, emanates loyalty and playful energy. With a warm, russet-colored coat and soulful eyes, Rusty is a cherished canine companion who brings joy and adventure to each day.",
                        Species = PetSpecies.Dog,
                        Age = 4,
                        UserID = 3,
                    },
                    new DbPet()
                    {
                        ID = 6,
                        Name = "Max",
                        Description = "Max, the energetic four-year-old Labrador, radiates boundless enthusiasm and a love for play. With a sleek, chocolate-colored coat and an ever-wagging tail, Max is a cherished canine companion who brings joy and adventure to every moment.",
                        Species = PetSpecies.Dog,
                        Age = 4,
                        UserID = 1,
                    },
                    new DbPet()
                    {
                        ID = 7,
                        Name = "Bella",
                        Description = "Bella, the vivacious four-year-old Labrador, exudes charm and a zest for life. With a shiny, golden coat and bright, sparkling eyes, Bella is a beloved canine companion who adds a touch of sunshine to every day.",
                        Species = PetSpecies.Dog,
                        Age = 4,
                        UserID = 1,
                    }
                );
            modelBuilder.Entity<DbPetJob>()
                .HasData(
                    new DbPetJob()
                    {
                        JobID = 1,
                        PetID = 1,
                    },
                    new DbPetJob()
                    {
                        JobID = 2,
                        PetID = 2,
                    }, new DbPetJob()
                    {
                        JobID = 3,
                        PetID = 3,
                    },
                    new DbPetJob()
                    {
                        JobID = 4,
                        PetID = 3,
                    },
                    new DbPetJob()
                    {
                        JobID = 4,
                        PetID = 5,
                    }, new DbPetJob()
                    {
                        JobID = 5,
                        PetID = 4,
                    }, new DbPetJob()
                    {
                        JobID = 6,
                        PetID = 6,
                    }, new DbPetJob()
                    {
                        JobID = 6,
                        PetID = 7,
                    }
                 );
            modelBuilder.Entity<DbJob>()
                .HasData(
                    new DbJob()
                    {
                        ID = 1,
                        Hours = 4,
                        Location = "Szeged",
                        Description = "Milio, the adorable four-legged companion, is in search of a caring pet sitter to take him on weekly adventures. As Milio's dedicated walker, you'll embark on leisurely strolls through the neighborhood, providing him with the exercise and social interaction he craves. Your bond with Milio will grow stronger with each outing, as you ensure he stays happy and healthy. Join Milio on his weekly walks and be part of his wagging tail tales!",
                        Status = Status.Available,
                        OwnerUserID = 1,
                        PetSitterUserID = null,
                        Payment = 10,
                        MinRequiredExperience = 0,
                        Repeated = true,
                        StartDate = DateTime.Now.AddDays(2),
                        Title = "Looking for a weekly walk buddy for Milio!",
                        Days = new List<DaysOfWeek>() { DaysOfWeek.Mon, DaysOfWeek.Wed, DaysOfWeek.Fri },
                        Type = JobType.Walking,
                    },
                    new DbJob()
                    {
                        ID = 2,
                        Hours = 3,
                        Location = "Szolnok",
                        Description = "Calling all cat lovers! Randy, the charming feline, is seeking a reliable house sitter to provide him with the utmost comfort and care while his humans are away. Your duties include feeding Randy, ensuring his litter box is pristine, and offering plenty of cuddles and playtime to keep him content. Randy's cozy home is your domain during this assignment, making it a purr-fect opportunity to enjoy quality time with a delightful kitty. If you're ready to be Randy's temporary guardian, apply now for this fulfilling house-sitting role!",
                        Status = Status.Available,
                        OwnerUserID = 2,
                        PetSitterUserID = null,
                        Payment = 20,
                        MinRequiredExperience = 1,
                        Repeated = false,
                        StartDate = DateTime.Now.AddDays(4),
                        EndDate = DateTime.Now.AddDays(4),
                        Title = "House-Sitting Delight: Randy the Cat's Comfy Companion Wanted!",
                        Type = JobType.Sitting,
                    },
                    new DbJob()
                    {
                        ID = 3,
                        Hours = 7,
                        Location = "Jászkarajenő",
                        Description = "Are you a dog lover looking for a rewarding side gig? We have an exciting job for you! Join our team to take Luna and Rusty, a delightful pair of dogs (Luna, a charming female, and Rusty, an energetic male), on weekly walks. Enjoy the great outdoors while earning extra income and providing these furry friends with the exercise and companionship they adore. Join us in fostering healthy and happy dogs while making a furry duo's week brighter!",
                        Status = Status.Available,
                        OwnerUserID = 3,
                        PetSitterUserID = null,
                        Payment = 30,
                        MinRequiredExperience = 3,
                        Repeated = true,
                        StartDate = DateTime.Now.AddDays(4),
                        Title = "Weekly Dog Walking Opportunity for Luna and Rusty",
                        Type = JobType.Walking,
                        Days = new List<DaysOfWeek>() { DaysOfWeek.Tue, DaysOfWeek.Wed, DaysOfWeek.Fri }
                    },
                    new DbJob()
                    {
                        ID = 4,
                        Hours = 5,
                        Location = "Debrecen",
                        Description = "Join the adventure with Luna, the energetic pup! Luna is looking for an enthusiastic pet sitter to accompany her on daily escapades filled with fun and excitement. Your role includes playtime, exercise, and ensuring Luna's safety during your outings. Embrace the joy of being Luna's daily companion and make her tail wag with happiness!",
                        Status = Status.Available,
                        OwnerUserID = 1,
                        PetSitterUserID = null,
                        Payment = 15,
                        MinRequiredExperience = 0,
                        Repeated = true,
                        StartDate = DateTime.Now.AddDays(3),
                        Title = "Daily Adventures with Luna!",
                        Days =new List<DaysOfWeek>() { DaysOfWeek.Mon, DaysOfWeek.Wed, DaysOfWeek.Fri },
                        Type = JobType.Walking,
                    },
                    new DbJob()
                    {
                        ID = 5,
                        Hours = 4,
                        Location = "Budapest",
                        Description = "Meet Whiskers, the charming senior cat in need of some extra TLC. Whiskers' owner is seeking a caring house sitter who can provide love, companionship, and attention to their beloved feline. Your daily routine includes feeding, gentle playtime, and ensuring Whiskers is comfortable and content. If you have a soft spot for senior cats and are ready to offer Whiskers a cozy haven, apply now!",
                        Status = Status.Available,
                        OwnerUserID = 2,
                        PetSitterUserID = null,
                        Payment = 25,
                        MinRequiredExperience = 2,
                        Repeated = false,
                        StartDate = DateTime.Now.AddDays(5),
                        EndDate = DateTime.Now.AddDays(8),
                        Title = "Senior Cat Care: Whiskers' Comfort Companion",
                        Type = JobType.Sitting,
                    },
                    new DbJob()
                    {
                        ID = 6,
                        Hours = 2,
                        Location = "Pécs",
                        Description = "Calling all canine enthusiasts! Max and Bella, the lively Labrador duo, are seeking an experienced pet sitter to provide them with weekly visits filled with fun and care. As their dedicated caretaker, you'll enjoy their playful antics and cherish the moments spent together. Your responsibilities include feeding, exercise, and ensuring Max and Bella have a fantastic weekly routine. Join Max and Bella on this pawsome journey and create unforgettable memories!",
                        Status = Status.Available,
                        OwnerUserID = 3,
                        PetSitterUserID = null,
                        Payment = 20,
                        MinRequiredExperience = 4,
                        Repeated = false,
                        StartDate = DateTime.Now.AddDays(4),
                        Title = "Weekly Labrador Love: Max and Bella's Pawsome Playdates",
                        Type = JobType.Visit,
                    }
                );
        }
    }  
}
