using DataAccess.DataObjects;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
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
        public DbSet<DbStatus> Statuses { get; set; }
        public DbSet<DbJob> Jobs { get; set; }
        public DbSet<DbPetImage> PetImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RoleConfiguration());

            modelBuilder.Entity<DbOwnerProfile>(entity =>
            {
                entity.ToTable("OwnerProfiles");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).IsUnicode(unicode: true);
                entity.Property(s => s.MinWage);
                entity.Property(s => s.RequiredExperience);
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
                entity.Property(s => s.Species).HasMaxLength(50).IsUnicode(unicode: true);
                entity.Property(s => s.Description).HasMaxLength(50).IsUnicode(unicode: true);
            });

            modelBuilder.Entity<DbJob>(entity =>
            {
                entity.ToTable("Jobs");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Description).HasMaxLength(50).IsUnicode(unicode: true);
                entity.Property(s => s.Hours);
                entity.Property(s => s.Location).HasMaxLength(50).IsUnicode(unicode: true);
            });

            modelBuilder.Entity<DbStatus>(entity =>
            {
                entity.ToTable("Statuses");
                entity.HasKey(s => s.ID);
                entity.Property(s => s.Name).HasMaxLength(50).IsUnicode(unicode: true); ;
            });

            modelBuilder.Entity<DbPetImage>(entity =>
            {
                entity.ToTable("PetImages");
                entity.HasKey(s => s.ID);
            });
                
            //Relationship configuration
            OneToOneRelationshipConfiguration(modelBuilder);
            OneToManyRelationshipConfiguration(modelBuilder);

            //Data seeding
            DataSeeding(modelBuilder);
        }

        private void OneToManyRelationshipConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbStatus>()
                .HasMany(c => c.Jobs)
                .WithOne(s => s.Status)
                .IsRequired();

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

            /*modelBuilder.Entity<DbPet>()
                .HasMany(c => c.Images)
                .WithOne(s => s.Pet)
                .HasForeignKey(e => e.PetID)
                .IsRequired();*/
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

            modelBuilder.Entity<DbPet>()
                .HasOne(c => c.Image)
                .WithOne(s => s.Pet)
                .HasForeignKey<DbPetImage>(e => e.PetID);
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
                        Name = "Vakarcs",
                        Description = "Szep kutya",
                        Species = "Kutya",
                        Age = 7,
                        UserID = 3,
                    },
                    new DbPet()
                    {
                        ID = 2,
                        Name = "Miu",
                        Description = "Szep cica",
                        Species = "Cica",
                        Age = 7,
                        UserID = 3,
                    },
                    new DbPet()
                    {
                        ID = 3,
                        Name = "Teki",
                        Description = "Szep teknőc",
                        Species = "Teknős",
                        Age = 7,
                        UserID = 3,
                    }
                );
            modelBuilder.Entity<DbStatus>()
                .HasData(
                    new DbStatus()
                    {
                        ID = 1,
                        Name = "Available" 
                    },
                    new DbStatus()
                    {
                        ID = 2,
                        Name = "In progress"
                    },
                    new DbStatus()
                    {
                        ID = 3,
                        Name = "Done"
                    }
                );
            modelBuilder.Entity<DbJob>()
                .HasData(
                    new DbJob()
                    {
                        ID = 1,
                        Hours = 4,
                        Location = "Szeged",
                        Description = "Kutyára kell vigyázni",
                        StatusID = 2,
                        OwnerUserID = 1,
                        PetSitterUserID = 2,
                        Payment = 10,
                    },
                    new DbJob()
                    {
                        ID = 2,
                        Hours = 3,
                        Location = "Szolnok",
                        Description = "Cicára kell vigyázni",
                        StatusID = 2,
                        OwnerUserID = 2,
                        PetSitterUserID = 1,
                        Payment = 20,
                    },
                    new DbJob()
                    {
                        ID = 3,
                        Hours = 7,
                        Location = "Jászkarajenő",
                        Description = "Teknőcre kell vigyázni",
                        StatusID = 1,
                        OwnerUserID = 3,
                        PetSitterUserID = 4,
                        Payment = 30,
                    }
                );
        }
    }  
}
