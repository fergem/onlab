﻿// <auto-generated />
using System;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(PetHolidayDbContext))]
    [Migration("20230510075850_StatusNameToEnum")]
    partial class StatusNameToEnum
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DataAccess.DataObjects.DbJob", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Hours")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("OwnerUserID")
                        .HasColumnType("int");

                    b.Property<int>("Payment")
                        .HasColumnType("int");

                    b.Property<int?>("PetSitterUserID")
                        .HasColumnType("int");

                    b.Property<int>("StatusID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("OwnerUserID");

                    b.HasIndex("PetSitterUserID");

                    b.HasIndex("StatusID");

                    b.ToTable("Jobs", (string)null);

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Description = "Kutyára kell vigyázni",
                            Hours = 4,
                            Location = "Szeged",
                            OwnerUserID = 1,
                            Payment = 10,
                            PetSitterUserID = 2,
                            StatusID = 2
                        },
                        new
                        {
                            ID = 2,
                            Description = "Cicára kell vigyázni",
                            Hours = 3,
                            Location = "Szolnok",
                            OwnerUserID = 2,
                            Payment = 20,
                            PetSitterUserID = 1,
                            StatusID = 2
                        },
                        new
                        {
                            ID = 3,
                            Description = "Teknőcre kell vigyázni",
                            Hours = 7,
                            Location = "Jászkarajenő",
                            OwnerUserID = 3,
                            Payment = 30,
                            PetSitterUserID = 4,
                            StatusID = 1
                        });
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbOwnerProfile", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Description")
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MinWage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RequiredExperience")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("OwnerProfiles", (string)null);
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPet", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Species")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Pets", (string)null);

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Age = 7,
                            Description = "Szep kutya",
                            Name = "Vakarcs",
                            Species = "Kutya",
                            UserID = 3
                        },
                        new
                        {
                            ID = 2,
                            Age = 7,
                            Description = "Szep cica",
                            Name = "Miu",
                            Species = "Cica",
                            UserID = 3
                        },
                        new
                        {
                            ID = 3,
                            Age = 7,
                            Description = "Szep teknőc",
                            Name = "Teki",
                            Species = "Teknős",
                            UserID = 3
                        });
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPetImage", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("PetID")
                        .HasColumnType("int");

                    b.Property<byte[]>("Picture")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("ID");

                    b.HasIndex("PetID")
                        .IsUnique();

                    b.ToTable("PetImages", (string)null);
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPetSitterProfile", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("AcquiredExperience")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaxWage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("PetSitterProfiles", (string)null);
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbStatus", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Statuses", (string)null);

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Name = "Available"
                        },
                        new
                        {
                            ID = 2,
                            Name = "Inprogress"
                        },
                        new
                        {
                            ID = 3,
                            Name = "Done"
                        });
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<byte[]>("Picture")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AccessFailedCount = 0,
                            Age = 23,
                            ConcurrencyStamp = "034a0440-f349-47fa-b651-3f9d86abc86b",
                            EmailConfirmed = false,
                            FirstName = "Kiss",
                            LastName = "Janos",
                            LockoutEnabled = false,
                            NormalizedUserName = "KISSJANOS",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAENtFhH9PVnpad58uSTzIxOK8BwilIH9va+3BQgpCanP6sH/6DrYPgiK0rTl8YFojyg==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "kissjanos"
                        },
                        new
                        {
                            Id = 2,
                            AccessFailedCount = 0,
                            Age = 32,
                            ConcurrencyStamp = "8f40d0d4-ceff-4bb0-8966-a217963d4e60",
                            EmailConfirmed = false,
                            FirstName = "Nagy",
                            LastName = "Feró",
                            LockoutEnabled = false,
                            NormalizedUserName = "NAGYFERO",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEPFCTWgmplqQ4aEwDkq1TLyyZCJNnEumjb/XZj4/jUjH0fMqKc+iTnnz9186y4Oavw==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "nagyfero"
                        },
                        new
                        {
                            Id = 3,
                            AccessFailedCount = 0,
                            Age = 43,
                            ConcurrencyStamp = "c450d51e-04ff-4b60-a2de-b8855e99a82b",
                            EmailConfirmed = false,
                            FirstName = "Vicc",
                            LastName = "Elek",
                            LockoutEnabled = false,
                            NormalizedUserName = "VICCELEK",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEC8RQDFcd6nmd4WgDMrrOr2stgMGtNWAROHjGMzBthS8D7ktoMjejQVnEm7tCLnkjA==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "viccelek"
                        },
                        new
                        {
                            Id = 4,
                            AccessFailedCount = 0,
                            Age = 17,
                            ConcurrencyStamp = "47f82d83-194d-410d-a9ca-10f288474ce3",
                            EmailConfirmed = false,
                            FirstName = "Maku",
                            LastName = "Látlan",
                            LockoutEnabled = false,
                            NormalizedUserName = "MAKULATLAN",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEIkmKGdcfm+tS6lKPT3um+Vf3mYUhBD5FXVGLHtXjTY9+kTdX0GXzIaJvRSmmGnFJg==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "makulatlan"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("IdentityRole");

                    b.HasData(
                        new
                        {
                            Id = "52a84995-a9f1-40bf-8b92-1009a714ce0a",
                            Name = "PetSitter",
                            NormalizedName = "PETSITTER"
                        },
                        new
                        {
                            Id = "c2f146d3-4986-474a-9082-7fbd8d7faf7b",
                            Name = "Owner",
                            NormalizedName = "OWNER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbJob", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbUser", "OwnerUser")
                        .WithMany("JobAdvertisements")
                        .HasForeignKey("OwnerUserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("DataAccess.DataObjects.DbUser", "PetSitterUser")
                        .WithMany("JobApplications")
                        .HasForeignKey("PetSitterUserID");

                    b.HasOne("DataAccess.DataObjects.DbStatus", "Status")
                        .WithMany("Jobs")
                        .HasForeignKey("StatusID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("OwnerUser");

                    b.Navigation("PetSitterUser");

                    b.Navigation("Status");
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbOwnerProfile", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbUser", "User")
                        .WithOne("OwnerProfile")
                        .HasForeignKey("DataAccess.DataObjects.DbOwnerProfile", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPet", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbUser", "User")
                        .WithMany("Pets")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPetImage", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbPet", "Pet")
                        .WithOne("Image")
                        .HasForeignKey("DataAccess.DataObjects.DbPetImage", "PetID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pet");
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPetSitterProfile", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbUser", "User")
                        .WithOne("PetSitterProfile")
                        .HasForeignKey("DataAccess.DataObjects.DbPetSitterProfile", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.DataObjects.DbUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPet", b =>
                {
                    b.Navigation("Image")
                        .IsRequired();
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbStatus", b =>
                {
                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbUser", b =>
                {
                    b.Navigation("JobAdvertisements");

                    b.Navigation("JobApplications");

                    b.Navigation("OwnerProfile")
                        .IsRequired();

                    b.Navigation("PetSitterProfile")
                        .IsRequired();

                    b.Navigation("Pets");
                });
#pragma warning restore 612, 618
        }
    }
}
