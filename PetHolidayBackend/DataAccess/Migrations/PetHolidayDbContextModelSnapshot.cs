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

            modelBuilder.Entity("DataAccess.DataObjects.DbJob", b =>
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

                    b.Property<bool>("Repeated")
                        .HasColumnType("bit");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("OwnerUserID");

                    b.HasIndex("PetSitterUserID");

                    b.ToTable("Jobs", (string)null);

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Days = "Mon,Wed,Fri",
                            Description = "Milio, the adorable four-legged companion, is in search of a caring pet sitter to take him on weekly adventures. As Milio's dedicated walker, you'll embark on leisurely strolls through the neighborhood, providing him with the exercise and social interaction he craves. Your bond with Milio will grow stronger with each outing, as you ensure he stays happy and healthy. Join Milio on his weekly walks and be part of his wagging tail tales!",
                            Hours = 4,
                            Location = "Szeged",
                            MinRequiredExperience = 0,
                            OwnerUserID = 1,
                            Payment = 10,
                            Repeated = true,
                            StartDate = new DateTime(2023, 9, 23, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(4757),
                            Status = 1,
                            Title = "Looking for a weekly walk buddy for Milio!",
                            Type = 2
                        },
                        new
                        {
                            ID = 2,
                            Description = "Calling all cat lovers! Randy, the charming feline, is seeking a reliable house sitter to provide him with the utmost comfort and care while his humans are away. Your duties include feeding Randy, ensuring his litter box is pristine, and offering plenty of cuddles and playtime to keep him content. Randy's cozy home is your domain during this assignment, making it a purr-fect opportunity to enjoy quality time with a delightful kitty. If you're ready to be Randy's temporary guardian, apply now for this fulfilling house-sitting role!",
                            EndDate = new DateTime(2023, 9, 25, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(4910),
                            Hours = 3,
                            Location = "Szolnok",
                            MinRequiredExperience = 1,
                            OwnerUserID = 2,
                            Payment = 20,
                            Repeated = false,
                            StartDate = new DateTime(2023, 9, 25, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(4908),
                            Status = 1,
                            Title = "House-Sitting Delight: Randy the Cat's Comfy Companion Wanted!",
                            Type = 0
                        },
                        new
                        {
                            ID = 3,
                            Days = "Tue,Wed,Fri",
                            Description = "Are you a dog lover looking for a rewarding side gig? We have an exciting job for you! Join our team to take Luna and Rusty, a delightful pair of dogs (Luna, a charming female, and Rusty, an energetic male), on weekly walks. Enjoy the great outdoors while earning extra income and providing these furry friends with the exercise and companionship they adore. Join us in fostering healthy and happy dogs while making a furry duo's week brighter!",
                            Hours = 7,
                            Location = "Jászkarajenő",
                            MinRequiredExperience = 3,
                            OwnerUserID = 3,
                            Payment = 30,
                            Repeated = true,
                            StartDate = new DateTime(2023, 9, 25, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(4917),
                            Status = 1,
                            Title = "Weekly Dog Walking Opportunity for Luna and Rusty",
                            Type = 2
                        },
                        new
                        {
                            ID = 4,
                            Days = "Mon,Wed,Fri",
                            Description = "Join the adventure with Luna, the energetic pup! Luna is looking for an enthusiastic pet sitter to accompany her on daily escapades filled with fun and excitement. Your role includes playtime, exercise, and ensuring Luna's safety during your outings. Embrace the joy of being Luna's daily companion and make her tail wag with happiness!",
                            Hours = 5,
                            Location = "Debrecen",
                            MinRequiredExperience = 0,
                            OwnerUserID = 1,
                            Payment = 15,
                            Repeated = true,
                            StartDate = new DateTime(2023, 9, 24, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(4995),
                            Status = 1,
                            Title = "Daily Adventures with Luna!",
                            Type = 2
                        },
                        new
                        {
                            ID = 5,
                            Description = "Meet Whiskers, the charming senior cat in need of some extra TLC. Whiskers' owner is seeking a caring house sitter who can provide love, companionship, and attention to their beloved feline. Your daily routine includes feeding, gentle playtime, and ensuring Whiskers is comfortable and content. If you have a soft spot for senior cats and are ready to offer Whiskers a cozy haven, apply now!",
                            EndDate = new DateTime(2023, 9, 29, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(5004),
                            Hours = 4,
                            Location = "Budapest",
                            MinRequiredExperience = 2,
                            OwnerUserID = 2,
                            Payment = 25,
                            Repeated = false,
                            StartDate = new DateTime(2023, 9, 26, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(5003),
                            Status = 1,
                            Title = "Senior Cat Care: Whiskers' Comfort Companion",
                            Type = 0
                        },
                        new
                        {
                            ID = 6,
                            Description = "Calling all canine enthusiasts! Max and Bella, the lively Labrador duo, are seeking an experienced pet sitter to provide them with weekly visits filled with fun and care. As their dedicated caretaker, you'll enjoy their playful antics and cherish the moments spent together. Your responsibilities include feeding, exercise, and ensuring Max and Bella have a fantastic weekly routine. Join Max and Bella on this pawsome journey and create unforgettable memories!",
                            Hours = 2,
                            Location = "Pécs",
                            MinRequiredExperience = 4,
                            OwnerUserID = 3,
                            Payment = 20,
                            Repeated = false,
                            StartDate = new DateTime(2023, 9, 25, 0, 6, 45, 287, DateTimeKind.Local).AddTicks(5007),
                            Status = 1,
                            Title = "Weekly Labrador Love: Max and Bella's Pawsome Playdates",
                            Type = 3
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
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(max)");

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
                            Description = "Milio, the seven-year-old dog, boasts a heartwarming mix of wisdom and playfulness, his tail wagging through years of cherished adventures and companionship. His loyal eyes and graying fur tell a tale of unwavering friendship and boundless joy.",
                            Name = "Milio",
                            Species = 0,
                            UserID = 1
                        },
                        new
                        {
                            ID = 2,
                            Age = 3,
                            Description = "Randy, the three-year-old cat, exudes youthful energy and curiosity in every graceful leap and stealthy pounce. With his sleek coat and bright, inquisitive eyes, he's a charming feline companion who brings a sense of enchantment to each day.",
                            Name = "Randy",
                            Species = 1,
                            UserID = 2
                        },
                        new
                        {
                            ID = 3,
                            Age = 2,
                            Description = "Luna, the two-year-old pup, radiates youthful exuberance, bringing endless energy and an infectious spirit to every moment. With her vibrant personality and sparkling eyes, she's a delightful and energetic companion for any adventure.",
                            Name = "Luna",
                            Species = 0,
                            UserID = 3
                        },
                        new
                        {
                            ID = 4,
                            Age = 3,
                            Description = "Whiskers, the three-year-old cat, exudes a graceful charm and inquisitive nature. With a glossy fur coat and sparkling eyes, Whiskers is a delightful feline companion who adds a touch of enchantment to every day.",
                            Name = "Whiskers",
                            Species = 1,
                            UserID = 2
                        },
                        new
                        {
                            ID = 5,
                            Age = 4,
                            Description = "Rusty, the four-year-old dog, emanates loyalty and playful energy. With a warm, russet-colored coat and soulful eyes, Rusty is a cherished canine companion who brings joy and adventure to each day.",
                            Name = "Rusty",
                            Species = 0,
                            UserID = 3
                        },
                        new
                        {
                            ID = 6,
                            Age = 4,
                            Description = "Max, the energetic four-year-old Labrador, radiates boundless enthusiasm and a love for play. With a sleek, chocolate-colored coat and an ever-wagging tail, Max is a cherished canine companion who brings joy and adventure to every moment.",
                            Name = "Max",
                            Species = 0,
                            UserID = 1
                        },
                        new
                        {
                            ID = 7,
                            Age = 4,
                            Description = "Bella, the vivacious four-year-old Labrador, exudes charm and a zest for life. With a shiny, golden coat and bright, sparkling eyes, Bella is a beloved canine companion who adds a touch of sunshine to every day.",
                            Name = "Bella",
                            Species = 0,
                            UserID = 1
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

            modelBuilder.Entity("DataAccess.DataObjects.DbPetJob", b =>
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
                            ConcurrencyStamp = "42ebb43a-11ea-45e0-a392-2a839463fb33",
                            EmailConfirmed = false,
                            FirstName = "Kiss",
                            LastName = "Janos",
                            LockoutEnabled = false,
                            NormalizedUserName = "KISSJANOS",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEPBPjxvH884iPmv9SXFYkdJqsdf92UYDW2rk0xQGedBA0RUgjNqkiV61BjzqkVtFtA==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "kissjanos"
                        },
                        new
                        {
                            Id = 2,
                            AccessFailedCount = 0,
                            Age = 32,
                            ConcurrencyStamp = "46a1d512-9eda-4051-ac7a-6fd1d8a10f86",
                            EmailConfirmed = false,
                            FirstName = "Nagy",
                            LastName = "Feró",
                            LockoutEnabled = false,
                            NormalizedUserName = "NAGYFERO",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEAfqR+iJLTjRhcb9suWuulLAKwQRZFn1QRTz/NJy+31JP3jnF84L2uLMKVVYYRhanQ==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "nagyfero"
                        },
                        new
                        {
                            Id = 3,
                            AccessFailedCount = 0,
                            Age = 43,
                            ConcurrencyStamp = "fc420dc5-6e5a-44fc-9e1c-7ac5ed733077",
                            EmailConfirmed = false,
                            FirstName = "Vicc",
                            LastName = "Elek",
                            LockoutEnabled = false,
                            NormalizedUserName = "VICCELEK",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEJmPqNY7z1p8GV4V5qBKm1eSXThSioQb5eupxgc9hZSnWt6r5y6Z1U7jjCgMKFx6UQ==",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserName = "viccelek"
                        },
                        new
                        {
                            Id = 4,
                            AccessFailedCount = 0,
                            Age = 17,
                            ConcurrencyStamp = "89b644cb-fcb6-4927-be90-e1eba03ec4ee",
                            EmailConfirmed = false,
                            FirstName = "Maku",
                            LastName = "Látlan",
                            LockoutEnabled = false,
                            NormalizedUserName = "MAKULATLAN",
                            Password = "asd",
                            PasswordHash = "AQAAAAIAAYagAAAAEOhT+6IR02traTnGzmBuP+wwr6QwH3CRksB/sOU0XKQ5o1/hu0jUzxqpEmGl8aqwQQ==",
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
                            Id = "95b85288-e390-403a-b2eb-522165eb4262",
                            Name = "PetSitter",
                            NormalizedName = "PETSITTER"
                        },
                        new
                        {
                            Id = "a3200571-17b7-448d-85d6-97dec17b2e29",
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

                    b.Navigation("OwnerUser");

                    b.Navigation("PetSitterUser");
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

            modelBuilder.Entity("DataAccess.DataObjects.DbPetJob", b =>
                {
                    b.HasOne("DataAccess.DataObjects.DbJob", "Job")
                        .WithMany("Pets")
                        .HasForeignKey("JobID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.DataObjects.DbPet", "Pet")
                        .WithMany("Jobs")
                        .HasForeignKey("PetID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Job");

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

            modelBuilder.Entity("DataAccess.DataObjects.DbJob", b =>
                {
                    b.Navigation("Pets");
                });

            modelBuilder.Entity("DataAccess.DataObjects.DbPet", b =>
                {
                    b.Navigation("Image")
                        .IsRequired();

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
