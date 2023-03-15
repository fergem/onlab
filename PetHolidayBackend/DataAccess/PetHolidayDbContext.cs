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

            modelBuilder.Entity<DbOwnerProfile>()
                .HasKey(s => s.ID);

            modelBuilder.Entity<DbOwnerProfile>()
                .Property(s => s.Description)
                .IsUnicode(unicode: true);

            modelBuilder.Entity<DbOwnerProfile>()
                .Property(s => s.MinWage);

            modelBuilder.Entity<DbOwnerProfile>()
                .Property(s => s.RequiredExperience);

            modelBuilder.Entity<DbPetSitterProfile>()
                .HasKey(s => s.ID);

            modelBuilder.Entity<DbPetSitterProfile>()
                .Property(s => s.Description)
                .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPetSitterProfile>()
                .Property(s => s.MaxWage);

            modelBuilder.Entity<DbPetSitterProfile>()
                .Property(s => s.AcquiredExperience);

            modelBuilder.Entity<DbOwnerProfile>()
                .HasOne<DbUser>(s => s.User)
                .WithOne(x => x.OwnerProfile)
                .HasForeignKey<DbUser>(x => x.OwnerProfileID);

            //modelBuilder.Entity<DbPetSitterProfile>()
            //    .HasOne<DbUser>(s => s.User)
            //    .WithOne(x => x.PetSitterProfile)
            //    .HasForeignKey<DbUser>(x => x.PetSitterProfileID);

            modelBuilder.Entity<DbPet>()
                .HasOne<DbUser>(s => s.User)
                .WithMany(x => x.Pets)
                .HasForeignKey(s => s.UserID);

            modelBuilder.Entity<DbUser>()
                .HasMany<DbJob>(s => s.JobAdvertisements)
                .WithOne(x => x.OwnerUser)
                .HasForeignKey(x => x.OwnerUserID);

            //modelBuilder.Entity<DbUser>()
            //    .HasMany<DbJob>(s => s.JobApplications)
            //    .WithOne(x => x.PetSitterUser)
            //    .HasForeignKey(x => x.PetSitterUserID);

            modelBuilder.Entity<DbJob>()
                .HasOne<DbStatus>(s => s.Status)
                .WithMany(x => x.Jobs)
                .HasForeignKey(x => x.StatusID);

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
        }
    }  
}
