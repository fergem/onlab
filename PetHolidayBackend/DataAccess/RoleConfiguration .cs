using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityRole<int>> builder)
        {
            builder.HasData(
            new IdentityRole<int>
            {
                Id = 1,
                Name = "PetSitter",
                NormalizedName = "PETSITTER"
            },
            new IdentityRole<int>
            {
                Id = 2,
                Name = "Owner",
                NormalizedName = "OWNER"
            });
        }
    }
}
