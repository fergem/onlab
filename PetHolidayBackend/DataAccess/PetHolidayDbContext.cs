using DataAccess.DataObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class PetHolidayDbContext: DbContext
    {
        public PetHolidayDbContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<DbPet> Pets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbPet>()
            .ToTable("pets");

            modelBuilder.Entity<DbPet>()
                .HasKey(s => s.ID);

            modelBuilder.Entity<DbPet>()
                .Property(s => s.Name)
                .HasMaxLength(50)
                .IsRequired(required: true)
                .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPet>()
                .Property(s => s.Age)
                .IsRequired(required: true);

            modelBuilder.Entity<DbPet>()
               .Property(s => s.Species)
               .HasMaxLength(50)
               .IsRequired(required: true)
               .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPet>()
               .Property(s => s.Description)
               .HasMaxLength(50)
               .IsRequired(required: true)
               .IsUnicode(unicode: true);

            modelBuilder.Entity<DbPet>()
            .HasData(new[]
            {
                new DbPet() {ID = 1, Name = "Vakarcs", Description = "Szép kutya", Species = "Kutya", Age = 7 },
                new DbPet() {ID = 2, Name = "Cicó", Description = "Szép cica", Species = "Cica", Age = 6 },
            });
        }
    }  
}
