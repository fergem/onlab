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
    [Migration("20230522085142_Updated_PetSitter_Profile")]
    partial class Updated_PetSitter_Profile
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

                    b.Property<int>("MinRequiredExperience")
                        .HasColumnType("int");

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
                            MinRequiredExperience = 0,
                            OwnerUserID = 1,
                            Payment = 10,
                            StatusID = 1
                        },
                        new
                        {
                            ID = 2,
                            Description = "Cicára kell vigyázni",
                            Hours = 3,
                            Location = "Szolnok",
                            MinRequiredExperience = 1,
                            OwnerUserID = 2,
                            Payment = 20,
                            StatusID = 1
                        },
                        new
                        {
                            ID = 3,
                            Description = "Teknőcre kell vigyázni",
                            Hours = 7,
                            Location = "Jászkarajenő",
                            MinRequiredExperience = 3,
                            OwnerUserID = 3,
                            Payment = 30,
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

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MinRequiredExperience")
                        .HasColumnType("int");

                    b.Property<int>("MinWage")
                        .HasColumnType("int");

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

                    b.Property<int>("AcquiredExperience")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaxWage")
                        .HasColumnType("int");

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
                            Name = "WaitingForApproval"
                        },
                        new
                        {
                            ID = 3,
                            Name = "Inprogress"
                        },
                        new
                        {
                            ID = 4,
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
                            ConcurrencyStamp = "fb51d5ca-69eb-413c-92af-35152e0e9fb4",
                            EmailConfirmed = false,
                            FirstName = "Kiss",
                            LastName = "Janos",
                            LockoutEnabled = false,
                            NormalizedUserName = "KISSJANOS",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEHKHf9pB3OgzURrVVwW1aAnWEALedBpCdkKG2HtVKie71Y80Y3Q5MprHPtty8gq00g==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "kissjanos"
                        },
                        new
                        {
                            Id = 2,
                            AccessFailedCount = 0,
                            Age = 32,
                            ConcurrencyStamp = "64e7dc60-5b2c-4e6b-a6ae-8f644f851f3c",
                            EmailConfirmed = false,
                            FirstName = "Nagy",
                            LastName = "Feró",
                            LockoutEnabled = false,
                            NormalizedUserName = "NAGYFERO",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEABC/LbRR14umurxJHoRaQBK7ZR9csBg9G3bLzDUGqK6w3fMYLTlJ+QkbsKwsfYsTw==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "nagyfero"
                        },
                        new
                        {
                            Id = 3,
                            AccessFailedCount = 0,
                            Age = 43,
                            ConcurrencyStamp = "7d355539-297c-4b28-8fbb-ee9b331eabc4",
                            EmailConfirmed = false,
                            FirstName = "Vicc",
                            LastName = "Elek",
                            LockoutEnabled = false,
                            NormalizedUserName = "VICCELEK",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEOduWhRjge+2cfUOg9rGyeoO/Ce/kQkfrpYTv2IIugIry6QPNmpJub4mXWJmXUQzeQ==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "viccelek"
                        },
                        new
                        {
                            Id = 4,
                            AccessFailedCount = 0,
                            Age = 17,
                            ConcurrencyStamp = "61adfa3e-20f3-49c6-82c6-b490ce77ac60",
                            EmailConfirmed = false,
                            FirstName = "Maku",
                            LastName = "Látlan",
                            LockoutEnabled = false,
                            NormalizedUserName = "MAKULATLAN",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEJ4BR9Gg2URnIBapL3lSqHtEGLKC5n9bm6pwl94yIB+nBmqXAw0E8moLJKXvOkQVcQ==",
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
                            Id = "2fed9430-004c-4a37-a28f-3cafa9c16a49",
                            Name = "PetSitter",
                            NormalizedName = "PETSITTER"
                        },
                        new
                        {
                            Id = "224b1c13-30dc-4fb1-98d8-988565550992",
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