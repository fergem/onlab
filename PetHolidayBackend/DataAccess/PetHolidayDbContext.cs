using DataAccess.DataObjects;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class PetHolidayDbContext : IdentityDbContext<DbUser>
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DbPet>()
            .ToTable("Pets");
            modelBuilder.Entity<DbOwnerProfile>()
            .ToTable("OwnerProfiles");
            modelBuilder.Entity<DbPetSitterProfile>()
            .ToTable("PetSitterProfiles");
            modelBuilder.Entity<DbJob>()
            .ToTable("Jobs");
            modelBuilder.Entity<DbStatus>()
            .ToTable("Statuses");


            //OwnerProfile
            modelBuilder.Entity<DbOwnerProfile>()
                .HasKey(s => s.ID);

            modelBuilder.Entity<DbOwnerProfile>()
                .Property(s => s.Description)
                .IsUnicode(unicode: true);

            modelBuilder.Entity<DbOwnerProfile>()
                .Property(s => s.MinWage);

            modelBuilder.Entity<DbOwnerProfile>()
                .Property(s => s.RequiredExperience);

            //PetsitterProfile
            modelBuilder.Entity<DbPetSitterProfile>()
                .HasKey(s => s.ID);

            modelBuilder.Entity<DbPetSitterProfile>()
                .Property(s => s.Description)
                .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPetSitterProfile>()
                .Property(s => s.MaxWage);

            modelBuilder.Entity<DbPetSitterProfile>()
                .Property(s => s.AcquiredExperience);

            /*modelBuilder.Entity<DbOwnerProfile>()
                .HasOne<DbUser>(s => s.User)
                .WithOne(x => x.OwnerProfile)
                .HasForeignKey<DbUser>(x => x.OwnerProfileID);
            **/
            //modelBuilder.Entity<DbPetSitterProfile>()
            //    .HasOne<DbUser>(s => s.User)
            //    .WithOne(x => x.PetSitterProfile)
            //    .HasForeignKey<DbUser>(x => x.PetSitterProfileID);

            modelBuilder.Entity<DbUser>()
                .HasMany<DbJob>(s => s.JobAdvertisements)
                .WithOne(x => x.OwnerUser)
                .HasForeignKey(x => x.OwnerUserID);

            //modelBuilder.Entity<DbUser>()
            //    .HasMany<DbJob>(s => s.JobApplications)
            //    .WithOne(x => x.PetSitterUser)
            //    .HasForeignKey(x => x.PetSitterUserID);

            //Pet
            modelBuilder.Entity<DbPet>()
                .HasKey(s => s.ID);

            modelBuilder.Entity<DbPet>()
                .Property(s => s.Name)
                .HasMaxLength(50)
                .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPet>()
                .Property(s => s.Age);

            modelBuilder.Entity<DbPet>()
               .Property(s => s.Species)
               .HasMaxLength(50)
               .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPet>()
               .Property(s => s.Description)
               .HasMaxLength(50)
               .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPet>()
                .HasOne<DbUser>(s => s.User)
                .WithMany(x => x.Pets)
                .HasForeignKey(s => s.UserID);

            //Job
            //modelBuilder.Entity<DbJob>()
            //    .HasOne<DbStatus>(s => s.Status)
            //    .WithMany(x => x.Jobs)
            //    .HasForeignKey(x => x.StatusID);

            modelBuilder.Entity<DbJob>()
                .HasKey(s => s.ID);

            modelBuilder.Entity<DbJob>()
                .Property(s => s.Description)
                .HasMaxLength(50)
                .IsUnicode(unicode: true);

            modelBuilder.Entity<DbJob>()
                .Property(s => s.Hours);

            modelBuilder.Entity<DbJob>()
               .Property(s => s.Location)
               .HasMaxLength(50)
               .IsUnicode(unicode: true);

            //Data seeding
            modelBuilder.Entity<DbUser>()
                .HasData(
                    new DbUser()
                    {
                        UserName = "kissjanos",
                        FirstName = "Kiss",
                        LastName = "Janos",
                        Age = 23,
                    },
                    new DbUser()
                    {
                        UserName = "nagyfero",
                        FirstName = "Nagy",
                        LastName = "Feró",
                        Age = 32,
                    },
                    new DbUser()
                    {
                        UserName = "viccelek",
                        FirstName = "Vicc",
                        LastName = "Elek",
                        Age = 43,
                    },
                    new DbUser()
                    {
                        UserName = "makulatlan",
                        FirstName = "Maku",
                        LastName = "Látlan",
                        Age = 17,
                    }
                );

            modelBuilder.Entity<DbPet>()
                .HasData(
                    new DbPet() 
                    { 
                        ID = 1, Name = "Vakarcs", Description = "Szep kutya", Species = "Kutya", Age = 7 
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
                    },
                    new DbJob()
                    {
                        ID = 2,
                        Hours = 3,
                        Location = "Szolnok",
                        Description = "Cicára kell vigyázni",
                    },
                    new DbJob()
                      {
                        ID = 3,
                        Hours = 7,
                        Location = "Jászkarajenő",
                        Description = "Teknőcre kell vigyázni",
                      }
                );
        }
    }  
}
