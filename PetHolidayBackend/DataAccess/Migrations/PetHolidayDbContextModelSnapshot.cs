﻿// <auto-generated />
using System;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(PetHolidayDbContext))]
    partial class PetHolidayDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Models.Job", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Days")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

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

                    b.Property<bool>("Repeated")
                        .HasColumnType("bit");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("OwnerUserID");

                    b.HasIndex("UserId");

                    b.ToTable("Jobs", (string)null);

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Days = "[\"Mon\",\"Wed\",\"Fri\"]",
                            Description = "Milio, the adorable four-legged companion, is in search of a caring pet sitter to take him on weekly adventures. As Milio's dedicated walker, you'll embark on leisurely strolls through the neighborhood, providing him with the exercise and social interaction he craves. Your bond with Milio will grow stronger with each outing, as you ensure he stays happy and healthy. Join Milio on his weekly walks and be part of his wagging tail tales!",
                            Location = "Szeged",
                            MinRequiredExperience = 0,
                            OwnerUserID = 1,
                            Payment = 10,
                            Repeated = true,
                            StartDate = new DateTime(2023, 10, 10, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(912),
                            Status = 1,
                            Title = "Looking for a weekly walk buddy for Milio!",
                            Type = 2
                        },
                        new
                        {
                            ID = 2,
                            Description = "Calling all cat lovers! Randy, the charming feline, is seeking a reliable house sitter to provide him with the utmost comfort and care while his humans are away. Your duties include feeding Randy, ensuring his litter box is pristine, and offering plenty of cuddles and playtime to keep him content. Randy's cozy home is your domain during this assignment, making it a purr-fect opportunity to enjoy quality time with a delightful kitty. If you're ready to be Randy's temporary guardian, apply now for this fulfilling house-sitting role!",
                            EndDate = new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(989),
                            Location = "Szolnok",
                            MinRequiredExperience = 1,
                            OwnerUserID = 2,
                            Payment = 20,
                            Repeated = false,
                            StartDate = new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(986),
                            Status = 1,
                            Title = "House-Sitting Delight: Randy the Cat's Comfy Companion Wanted!",
                            Type = 0
                        },
                        new
                        {
                            ID = 3,
                            Days = "[\"Tue\",\"Wed\",\"Fri\"]",
                            Description = "Are you a dog lover looking for a rewarding side gig? We have an exciting job for you! Join our team to take Luna and Rusty, a delightful pair of dogs (Luna, a charming female, and Rusty, an energetic male), on weekly walks. Enjoy the great outdoors while earning extra income and providing these furry friends with the exercise and companionship they adore. Join us in fostering healthy and happy dogs while making a furry duo's week brighter!",
                            Location = "Jászkarajenő",
                            MinRequiredExperience = 3,
                            OwnerUserID = 3,
                            Payment = 30,
                            Repeated = true,
                            StartDate = new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(997),
                            Status = 1,
                            Title = "Weekly Dog Walking Opportunity for Luna and Rusty",
                            Type = 2
                        },
                        new
                        {
                            ID = 4,
                            Days = "[\"Mon\",\"Wed\",\"Fri\"]",
                            Description = "Join the adventure with Luna, the energetic pup! Luna is looking for an enthusiastic pet sitter to accompany her on daily escapades filled with fun and excitement. Your role includes playtime, exercise, and ensuring Luna's safety during your outings. Embrace the joy of being Luna's daily companion and make her tail wag with happiness!",
                            Location = "Debrecen",
                            MinRequiredExperience = 0,
                            OwnerUserID = 1,
                            Payment = 15,
                            Repeated = true,
                            StartDate = new DateTime(2023, 10, 11, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1004),
                            Status = 1,
                            Title = "Daily Adventures with Luna!",
                            Type = 2
                        },
                        new
                        {
                            ID = 5,
                            Description = "Meet Whiskers, the charming senior cat in need of some extra TLC. Whiskers' owner is seeking a caring house sitter who can provide love, companionship, and attention to their beloved feline. Your daily routine includes feeding, gentle playtime, and ensuring Whiskers is comfortable and content. If you have a soft spot for senior cats and are ready to offer Whiskers a cozy haven, apply now!",
                            EndDate = new DateTime(2023, 10, 16, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1012),
                            Location = "Budapest",
                            MinRequiredExperience = 2,
                            OwnerUserID = 2,
                            Payment = 25,
                            Repeated = false,
                            StartDate = new DateTime(2023, 10, 13, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1010),
                            Status = 1,
                            Title = "Senior Cat Care: Whiskers' Comfort Companion",
                            Type = 0
                        },
                        new
                        {
                            ID = 6,
                            Description = "Calling all canine enthusiasts! Max and Bella, the lively Labrador duo, are seeking an experienced pet sitter to provide them with weekly visits filled with fun and care. As their dedicated caretaker, you'll enjoy their playful antics and cherish the moments spent together. Your responsibilities include feeding, exercise, and ensuring Max and Bella have a fantastic weekly routine. Join Max and Bella on this pawsome journey and create unforgettable memories!",
                            Location = "Pécs",
                            MinRequiredExperience = 4,
                            OwnerUserID = 3,
                            Payment = 20,
                            Repeated = false,
                            StartDate = new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1018),
                            Status = 1,
                            Title = "Weekly Labrador Love: Max and Bella's Pawsome Playdates",
                            Type = 3
                        });
                });

            modelBuilder.Entity("Domain.Models.JobApplication", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("ApplicantUserID")
                        .HasColumnType("int");

                    b.Property<bool>("IsApproved")
                        .HasColumnType("bit");

                    b.Property<int>("JobID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ApplicantUserID");

                    b.HasIndex("JobID");

                    b.ToTable("JobApplications", (string)null);
                });

            modelBuilder.Entity("Domain.Models.JobApplicationComment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("CommentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CommentText")
                        .HasMaxLength(200)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("JobApplicationID")
                        .HasColumnType("int");

                    b.Property<int>("SenderUserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("JobApplicationID");

                    b.ToTable("JobApplicationComments", (string)null);
                });

            modelBuilder.Entity("Domain.Models.OwnerProfile", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Description")
                        .IsUnicode(true)
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

            modelBuilder.Entity("Domain.Models.Pet", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Species")
                        .HasColumnType("int");

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
                            Name = "Milio",
                            Species = 0,
                            UserID = 1
                        },
                        new
                        {
                            ID = 2,
                            Age = 3,
                            Name = "Randy",
                            Species = 1,
                            UserID = 2
                        },
                        new
                        {
                            ID = 3,
                            Age = 2,
                            Name = "Luna",
                            Species = 0,
                            UserID = 3
                        },
                        new
                        {
                            ID = 4,
                            Age = 3,
                            Name = "Whiskers",
                            Species = 1,
                            UserID = 2
                        },
                        new
                        {
                            ID = 5,
                            Age = 4,
                            Name = "Rusty",
                            Species = 0,
                            UserID = 3
                        },
                        new
                        {
                            ID = 6,
                            Age = 4,
                            Name = "Max",
                            Species = 0,
                            UserID = 1
                        },
                        new
                        {
                            ID = 7,
                            Age = 4,
                            Name = "Bella",
                            Species = 0,
                            UserID = 1
                        });
                });

            modelBuilder.Entity("Domain.Models.PetImage", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("PetID")
                        .HasColumnType("int");

                    b.Property<byte[]>("Picture")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.HasKey("ID");

                    b.HasIndex("PetID");

                    b.ToTable("PetImages", (string)null);
                });

            modelBuilder.Entity("Domain.Models.PetJob", b =>
                {
                    b.Property<int>("PetID")
                        .HasColumnType("int");

                    b.Property<int>("JobID")
                        .HasColumnType("int");

                    b.HasKey("PetID", "JobID");

                    b.HasIndex("JobID");

                    b.ToTable("PetJob", (string)null);

                    b.HasData(
                        new
                        {
                            PetID = 1,
                            JobID = 1
                        },
                        new
                        {
                            PetID = 2,
                            JobID = 2
                        },
                        new
                        {
                            PetID = 3,
                            JobID = 3
                        },
                        new
                        {
                            PetID = 3,
                            JobID = 4
                        },
                        new
                        {
                            PetID = 5,
                            JobID = 4
                        },
                        new
                        {
                            PetID = 4,
                            JobID = 5
                        },
                        new
                        {
                            PetID = 6,
                            JobID = 6
                        },
                        new
                        {
                            PetID = 7,
                            JobID = 6
                        });
                });

            modelBuilder.Entity("Domain.Models.PetSitterProfile", b =>
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

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("PetSitterProfiles", (string)null);
                });

            modelBuilder.Entity("Domain.Models.User", b =>
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
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
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

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

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
                            ConcurrencyStamp = "884aae4e-197f-4417-849a-b091409a9750",
                            EmailConfirmed = false,
                            FirstName = "Kiss",
                            LastName = "Janos",
                            LockoutEnabled = false,
                            NormalizedUserName = "KISSJANOS",
                            Password = "asd",
                            PasswordHash = "asd",
                            PhoneNumberConfirmed = false,
                            RefreshTokenExpiryTime = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            TwoFactorEnabled = false,
                            UserName = "kissjanos"
                        },
                        new
                        {
                            Id = 2,
                            AccessFailedCount = 0,
                            Age = 32,
                            ConcurrencyStamp = "1a126382-5d76-450b-8e8a-f71c6ad35fc2",
                            EmailConfirmed = false,
                            FirstName = "Nagy",
                            LastName = "Feró",
                            LockoutEnabled = false,
                            NormalizedUserName = "NAGYFERO",
                            Password = "asd",
                            PasswordHash = "asd",
                            PhoneNumberConfirmed = false,
                            RefreshTokenExpiryTime = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            TwoFactorEnabled = false,
                            UserName = "nagyfero"
                        },
                        new
                        {
                            Id = 3,
                            AccessFailedCount = 0,
                            Age = 43,
                            ConcurrencyStamp = "9fe3d616-50e9-4afc-b1bb-ab135c61d878",
                            EmailConfirmed = false,
                            FirstName = "Vicc",
                            LastName = "Elek",
                            LockoutEnabled = false,
                            NormalizedUserName = "VICCELEK",
                            Password = "asd",
                            PasswordHash = "asd",
                            PhoneNumberConfirmed = false,
                            RefreshTokenExpiryTime = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            TwoFactorEnabled = false,
                            UserName = "viccelek"
                        },
                        new
                        {
                            Id = 4,
                            AccessFailedCount = 0,
                            Age = 17,
                            ConcurrencyStamp = "ab716eac-5600-4f93-b27d-a7ebd3b50072",
                            EmailConfirmed = false,
                            FirstName = "Maku",
                            LastName = "Látlan",
                            LockoutEnabled = false,
                            NormalizedUserName = "MAKULATLAN",
                            Password = "asd",
                            PasswordHash = "asd",
                            PhoneNumberConfirmed = false,
                            RefreshTokenExpiryTime = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            TwoFactorEnabled = false,
                            UserName = "makulatlan"
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

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "PetSitter",
                            NormalizedName = "PETSITTER"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Owner",
                            NormalizedName = "OWNER"
                        });
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

            modelBuilder.Entity("Domain.Models.Job", b =>
                {
                    b.HasOne("Domain.Models.User", "OwnerUser")
                        .WithMany("JobAdvertisements")
                        .HasForeignKey("OwnerUserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain.Models.User", null)
                        .WithMany("JobApplications")
                        .HasForeignKey("UserId");

                    b.Navigation("OwnerUser");
                });

            modelBuilder.Entity("Domain.Models.JobApplication", b =>
                {
                    b.HasOne("Domain.Models.User", "ApplicantUser")
                        .WithMany()
                        .HasForeignKey("ApplicantUserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Job", "Job")
                        .WithMany("JobApplications")
                        .HasForeignKey("JobID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApplicantUser");

                    b.Navigation("Job");
                });

            modelBuilder.Entity("Domain.Models.JobApplicationComment", b =>
                {
                    b.HasOne("Domain.Models.JobApplication", "JobApplication")
                        .WithMany("Comments")
                        .HasForeignKey("JobApplicationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("JobApplication");
                });

            modelBuilder.Entity("Domain.Models.OwnerProfile", b =>
                {
                    b.HasOne("Domain.Models.User", "User")
                        .WithOne("OwnerProfile")
                        .HasForeignKey("Domain.Models.OwnerProfile", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.Pet", b =>
                {
                    b.HasOne("Domain.Models.User", "User")
                        .WithMany("Pets")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.PetImage", b =>
                {
                    b.HasOne("Domain.Models.Pet", "Pet")
                        .WithMany("Images")
                        .HasForeignKey("PetID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pet");
                });

            modelBuilder.Entity("Domain.Models.PetJob", b =>
                {
                    b.HasOne("Domain.Models.Job", "Job")
                        .WithMany("Pets")
                        .HasForeignKey("JobID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Pet", "Pet")
                        .WithMany("Jobs")
                        .HasForeignKey("PetID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("Pet");
                });

            modelBuilder.Entity("Domain.Models.PetSitterProfile", b =>
                {
                    b.HasOne("Domain.Models.User", "User")
                        .WithOne("PetSitterProfile")
                        .HasForeignKey("Domain.Models.PetSitterProfile", "UserID")
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
                    b.HasOne("Domain.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Domain.Models.User", null)
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

                    b.HasOne("Domain.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Domain.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Models.Job", b =>
                {
                    b.Navigation("JobApplications");

                    b.Navigation("Pets");
                });

            modelBuilder.Entity("Domain.Models.JobApplication", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Domain.Models.Pet", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("Domain.Models.User", b =>
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
