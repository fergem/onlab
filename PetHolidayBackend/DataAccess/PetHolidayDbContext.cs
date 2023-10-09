using Domain.Models;
using Domain.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DataAccess
{
    public class PetHolidayDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public PetHolidayDbContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<PetSitterProfile> PetSitterProfiles { get; set; }
        public DbSet<OwnerProfile> OwnerProfiles { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<PetImage> PetImages { get; set; }
        public DbSet<PetJob> PetJobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<JobApplicationComment> JobApplicationsComment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RoleConfiguration());

            //modelBuilder.Entity<User>().Navigation(s => s.OwnerProfile).AutoInclude();
            //modelBuilder.Entity<PetJob>().Navigation(s => s.Job).AutoInclude();
            //modelBuilder.Entity<PetJob>().Navigation(s => s.Pet).AutoInclude();
            //modelBuilder.Entity<Pet>().Navigation(s => s.Images).AutoInclude();


            modelBuilder.Entity<PetJob>(entity =>
            {
                entity.ToTable("PetJob");
                entity.HasKey(s => new { s.PetID, s.JobID });
            });

            modelBuilder.Entity<OwnerProfile>(entity =>
            {
                entity.ToTable("OwnerProfiles");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
                entity.Property(s => s.MinWage);
                entity.Property(s => s.MinRequiredExperience);
            });

            modelBuilder.Entity<PetSitterProfile>(entity =>
            {
                entity.ToTable("PetSitterProfiles");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
                entity.Property(s => s.AcquiredExperience);
            });

            modelBuilder.Entity<Pet>(entity =>
            {
                entity.ToTable("Pets");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Name).HasMaxLength(50).IsUnicode(unicode: true);
                entity.Property(s => s.Age);
                entity.Property(s => s.Species);
            });

            var converter = new EnumCollectionJsonValueConverter<DaysOfWeek>();
            var comparer = new CollectionValueComparer<DaysOfWeek>();

            modelBuilder.Entity<Job>(entity =>
            {
                entity.ToTable("Jobs");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
                entity.Property(s => s.Location).HasMaxLength(50).IsUnicode(unicode: true);
                entity.Property(s => s.Days).IsRequired(false)
                                             .HasConversion(converter)
                                             .Metadata.SetValueComparer(comparer);
            });

            modelBuilder.Entity<PetImage>(entity =>
            {
                entity.ToTable("PetImages");
                entity.HasKey(s => s.ID);
            });

            modelBuilder.Entity<JobApplication>(entity =>
            {
                entity.ToTable("JobApplications");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.IsApproved);
            });

            modelBuilder.Entity<JobApplicationComment>(entity =>
            {
                entity.ToTable("JobApplicationComments");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.CommentText).IsUnicode(unicode: true).HasMaxLength(200);
                entity.Property(s => s.CommentDate);
                entity.Property(s => s.SenderUserID);
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
            modelBuilder.Entity<User>()
                .HasMany(c => c.Pets)
                .WithOne(s => s.User)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(c => c.JobAdvertisements)
                .WithOne(s => s.OwnerUser)
                .HasForeignKey(e => e.OwnerUserID)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            /*modelBuilder.Entity<DbUser>()
                .HasMany(c => c.JobApplications)
                .WithOne(s => s.PetSitterUser)
                .HasForeignKey(e => e.PetSitterUserID);*/

            modelBuilder.Entity<Pet>()
                .HasMany(c => c.Images)
                .WithOne(s => s.Pet)
                .HasForeignKey(e => e.PetID)
                .IsRequired();

            modelBuilder.Entity<Job>()
                .HasMany(j => j.JobApplications)
                .WithOne(a => a.Job)
                .HasForeignKey(a => a.JobID);

            modelBuilder.Entity<JobApplication>()
                .HasMany(j => j.Comments)
                .WithOne(a => a.JobApplication)
                .HasForeignKey(a => a.JobApplicationID);

            modelBuilder.Entity<User>()
                .HasMany(j => j.JobApplications)
                .WithOne(a => a.ApplicantUser)
                .HasForeignKey(a => a.ApplicantUserID);
        }

        private void OneToOneRelationshipConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(c => c.OwnerProfile)
                .WithOne(s => s.User)
                .HasForeignKey<OwnerProfile>(b => b.UserID);

            modelBuilder.Entity<User>()
                .HasOne(c => c.PetSitterProfile)
                .WithOne(s => s.User)
                .HasForeignKey<PetSitterProfile>(b => b.UserID);

        }

        private void ManyToManyRelationshipConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PetJob>()
                .HasOne(s => s.Job)
                .WithMany(s => s.Pets)
                .HasForeignKey(s => s.JobID);

            modelBuilder.Entity<PetJob>()
                .HasOne(s => s.Pet)
                .WithMany(s => s.Jobs)
                .HasForeignKey(s => s.PetID);
        }

        public void DataSeeding(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            modelBuilder.Entity<User>()
                .HasData(
                    new User()
                    {
                        Id = 1,
                        UserName = "kissjanos",
                        FirstName = "Kiss",
                        LastName = "Janos",
                        Age = 23,
                        Password = "asd",
                        NormalizedUserName = "KISSJANOS",
                        PasswordHash = "asd",
                    },
                    new User()
                    {
                        Id = 2,
                        UserName = "nagyfero",
                        FirstName = "Nagy",
                        LastName = "Feró",
                        Age = 32,
                        Password = "asd",
                        NormalizedUserName = "NAGYFERO",
                        PasswordHash = "asd",
                    },
                    new User()
                    {
                        Id = 3,
                        UserName = "viccelek",
                        FirstName = "Vicc",
                        LastName = "Elek",
                        Age = 43,
                        Password = "asd",
                        NormalizedUserName = "VICCELEK",
                        PasswordHash = "asd",
                    },
                    new User()
                    {
                        Id = 4,
                        UserName = "makulatlan",
                        FirstName = "Maku",
                        LastName = "Látlan",
                        Age = 17,
                        Password = "asd",
                        NormalizedUserName = "MAKULATLAN",
                        PasswordHash = "asd",
                    }
                );

            modelBuilder.Entity<Pet>()
                .HasData(
                    new Pet()
                    {
                        ID = 1,
                        Name = "Milio",
                        Species = PetSpecies.Dog,
                        Age = 7,
                        UserID = 1,
                    },
                    new Pet()
                    {
                        ID = 2,
                        Name = "Randy",
                        Species = PetSpecies.Cat,
                        Age = 3,
                        UserID = 2,
                    },
                    new Pet()
                    {
                        ID = 3,
                        Name = "Luna",
                        Species = PetSpecies.Dog,
                        Age = 2,
                        UserID = 3,
                    },
                    new Pet()
                    {
                        ID = 4,
                        Name = "Whiskers",
                        Species = PetSpecies.Cat,
                        Age = 3,
                        UserID = 2,
                    },
                    new Pet()
                    {
                        ID = 5,
                        Name = "Rusty",
                        Species = PetSpecies.Dog,
                        Age = 4,
                        UserID = 3,
                    },
                    new Pet()
                    {
                        ID = 6,
                        Name = "Max",
                        Species = PetSpecies.Dog,
                        Age = 4,
                        UserID = 1,
                    },
                    new Pet()
                    {
                        ID = 7,
                        Name = "Bella",
                        Species = PetSpecies.Dog,
                        Age = 4,
                        UserID = 1,
                    }
                );
            modelBuilder.Entity<PetJob>()
                .HasData(
                    new PetJob()
                    {
                        JobID = 1,
                        PetID = 1,
                    },
                    new PetJob()
                    {
                        JobID = 2,
                        PetID = 2,
                    }, new PetJob()
                    {
                        JobID = 3,
                        PetID = 3,
                    },
                    new PetJob()
                    {
                        JobID = 4,
                        PetID = 3,
                    },
                    new PetJob()
                    {
                        JobID = 4,
                        PetID = 5,
                    }, new PetJob()
                    {
                        JobID = 5,
                        PetID = 4,
                    }, new PetJob()
                    {
                        JobID = 6,
                        PetID = 6,
                    }, new PetJob()
                    {
                        JobID = 6,
                        PetID = 7,
                    }
                 );
            modelBuilder.Entity<Job>()
                .HasData(
                    new Job()
                    {
                        ID = 1,
                        Location = "Szeged",
                        Description = "Milio, the adorable four-legged companion, is in search of a caring pet sitter to take him on weekly adventures. As Milio's dedicated walker, you'll embark on leisurely strolls through the neighborhood, providing him with the exercise and social interaction he craves. Your bond with Milio will grow stronger with each outing, as you ensure he stays happy and healthy. Join Milio on his weekly walks and be part of his wagging tail tales!",
                        Status = Status.Available,
                        OwnerUserID = 1,
                        Payment = 10,
                        MinRequiredExperience = 0,
                        Repeated = true,
                        StartDate = DateTime.Now.AddDays(2),
                        Title = "Looking for a weekly walk buddy for Milio!",
                        Days = new List<DaysOfWeek>() { DaysOfWeek.Mon, DaysOfWeek.Wed, DaysOfWeek.Fri },
                        Type = JobType.Walking,
                    },
                    new Job()
                    {
                        ID = 2,
                        Location = "Szolnok",
                        Description = "Calling all cat lovers! Randy, the charming feline, is seeking a reliable house sitter to provide him with the utmost comfort and care while his humans are away. Your duties include feeding Randy, ensuring his litter box is pristine, and offering plenty of cuddles and playtime to keep him content. Randy's cozy home is your domain during this assignment, making it a purr-fect opportunity to enjoy quality time with a delightful kitty. If you're ready to be Randy's temporary guardian, apply now for this fulfilling house-sitting role!",
                        Status = Status.Available,
                        OwnerUserID = 2,
                        Payment = 20,
                        MinRequiredExperience = 1,
                        Repeated = false,
                        StartDate = DateTime.Now.AddDays(4),
                        EndDate = DateTime.Now.AddDays(4),
                        Title = "House-Sitting Delight: Randy the Cat's Comfy Companion Wanted!",
                        Type = JobType.Sitting,
                    },
                    new Job()
                    {
                        ID = 3,
                        Location = "Jászkarajenő",
                        Description = "Are you a dog lover looking for a rewarding side gig? We have an exciting job for you! Join our team to take Luna and Rusty, a delightful pair of dogs (Luna, a charming female, and Rusty, an energetic male), on weekly walks. Enjoy the great outdoors while earning extra income and providing these furry friends with the exercise and companionship they adore. Join us in fostering healthy and happy dogs while making a furry duo's week brighter!",
                        Status = Status.Available,
                        OwnerUserID = 3,
                        Payment = 30,
                        MinRequiredExperience = 3,
                        Repeated = true,
                        StartDate = DateTime.Now.AddDays(4),
                        Title = "Weekly Dog Walking Opportunity for Luna and Rusty",
                        Type = JobType.Walking,
                        Days = new List<DaysOfWeek>() { DaysOfWeek.Tue, DaysOfWeek.Wed, DaysOfWeek.Fri }
                    },
                    new Job()
                    {
                        ID = 4,
                        Location = "Debrecen",
                        Description = "Join the adventure with Luna, the energetic pup! Luna is looking for an enthusiastic pet sitter to accompany her on daily escapades filled with fun and excitement. Your role includes playtime, exercise, and ensuring Luna's safety during your outings. Embrace the joy of being Luna's daily companion and make her tail wag with happiness!",
                        Status = Status.Available,
                        OwnerUserID = 1,
                        Payment = 15,
                        MinRequiredExperience = 0,
                        Repeated = true,
                        StartDate = DateTime.Now.AddDays(3),
                        Title = "Daily Adventures with Luna!",
                        Days = new List<DaysOfWeek>() { DaysOfWeek.Mon, DaysOfWeek.Wed, DaysOfWeek.Fri },
                        Type = JobType.Walking,
                    },
                    new Job()
                    {
                        ID = 5,
                        Location = "Budapest",
                        Description = "Meet Whiskers, the charming senior cat in need of some extra TLC. Whiskers' owner is seeking a caring house sitter who can provide love, companionship, and attention to their beloved feline. Your daily routine includes feeding, gentle playtime, and ensuring Whiskers is comfortable and content. If you have a soft spot for senior cats and are ready to offer Whiskers a cozy haven, apply now!",
                        Status = Status.Available,
                        OwnerUserID = 2,
                        Payment = 25,
                        MinRequiredExperience = 2,
                        Repeated = false,
                        StartDate = DateTime.Now.AddDays(5),
                        EndDate = DateTime.Now.AddDays(8),
                        Title = "Senior Cat Care: Whiskers' Comfort Companion",
                        Type = JobType.Sitting,
                    },
                    new Job()
                    {
                        ID = 6,
                        Location = "Pécs",
                        Description = "Calling all canine enthusiasts! Max and Bella, the lively Labrador duo, are seeking an experienced pet sitter to provide them with weekly visits filled with fun and care. As their dedicated caretaker, you'll enjoy their playful antics and cherish the moments spent together. Your responsibilities include feeding, exercise, and ensuring Max and Bella have a fantastic weekly routine. Join Max and Bella on this pawsome journey and create unforgettable memories!",
                        Status = Status.Available,
                        OwnerUserID = 3,
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
