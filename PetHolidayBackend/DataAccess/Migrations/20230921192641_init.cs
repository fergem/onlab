using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Picture = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IdentityRole",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Location = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Hours = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Payment = table.Column<int>(type: "int", nullable: false),
                    MinRequiredExperience = table.Column<int>(type: "int", nullable: false),
                    Repeated = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Days = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerUserID = table.Column<int>(type: "int", nullable: false),
                    PetSitterUserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Jobs_AspNetUsers_OwnerUserID",
                        column: x => x.OwnerUserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Jobs_AspNetUsers_PetSitterUserID",
                        column: x => x.PetSitterUserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OwnerProfiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MinRequiredExperience = table.Column<int>(type: "int", nullable: false),
                    MinWage = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnerProfiles", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OwnerProfiles_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pets",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Species = table.Column<int>(type: "int", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pets", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Pets_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PetSitterProfiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AcquiredExperience = table.Column<int>(type: "int", nullable: false),
                    MaxWage = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetSitterProfiles", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PetSitterProfiles_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PetImages",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Picture = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    PetID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetImages", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PetImages_Pets_PetID",
                        column: x => x.PetID,
                        principalTable: "Pets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PetJob",
                columns: table => new
                {
                    JobID = table.Column<int>(type: "int", nullable: false),
                    PetID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetJob", x => new { x.PetID, x.JobID });
                    table.ForeignKey(
                        name: "FK_PetJob_Jobs_JobID",
                        column: x => x.JobID,
                        principalTable: "Jobs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PetJob_Pets_PetID",
                        column: x => x.PetID,
                        principalTable: "Pets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Age", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "Location", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Picture", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { 1, 0, 23, "52dbad8b-ae66-4bb7-b775-26e724878534", null, false, "Kiss", "Janos", null, false, null, null, "KISSJANOS", "asd", "AQAAAAIAAYagAAAAEKAxrRqfz5ACKaQOA49fHoohDY/eB0C4GQEKTMSpwb9pCviWsCPlAuPKxYzE0Y7RJw==", null, false, null, null, false, "kissjanos" },
                    { 2, 0, 32, "fff3f9f9-9542-4f4c-99ba-dc8599a736f2", null, false, "Nagy", "Feró", null, false, null, null, "NAGYFERO", "asd", "AQAAAAIAAYagAAAAEPNlGU5iikuIwVNhLw5GZyoY9GRS+KGt27oE2zDM8BJL2v5UxUCsDudKswjYf2tmXw==", null, false, null, null, false, "nagyfero" },
                    { 3, 0, 43, "115915ab-2b49-4918-85e9-cd5e95c3c926", null, false, "Vicc", "Elek", null, false, null, null, "VICCELEK", "asd", "AQAAAAIAAYagAAAAEEgNf/5xnyzREp4FBb802kHD+bqNLGD0+391q5/wdGzxlu6EPL9qpsZTBXucGATvaQ==", null, false, null, null, false, "viccelek" },
                    { 4, 0, 17, "b0a9ca6b-5f08-40dc-83a8-18c8963afdfd", null, false, "Maku", "Látlan", null, false, null, null, "MAKULATLAN", "asd", "AQAAAAIAAYagAAAAEMNPn1ltNh72yjYnmFpqL34bSROdGj/EEt1TrwevPS6k6Q0elxEx09/sNRtvmLDLig==", null, false, null, null, false, "makulatlan" }
                });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7c80ab50-a546-43c9-9028-ae1e6ac1585d", null, "PetSitter", "PETSITTER" },
                    { "bdfdca8d-f5fb-4162-9dfe-f5289bfdcaa8", null, "Owner", "OWNER" }
                });

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "ID", "Days", "Description", "EndDate", "Hours", "Location", "MinRequiredExperience", "OwnerUserID", "Payment", "PetSitterUserID", "Repeated", "StartDate", "Status", "Title", "Type" },
                values: new object[,]
                {
                    { 1, "[\"Mon\",\"Wed\",\"Fri\"]", "Milio, the adorable four-legged companion, is in search of a caring pet sitter to take him on weekly adventures. As Milio's dedicated walker, you'll embark on leisurely strolls through the neighborhood, providing him with the exercise and social interaction he craves. Your bond with Milio will grow stronger with each outing, as you ensure he stays happy and healthy. Join Milio on his weekly walks and be part of his wagging tail tales!", null, 4, "Szeged", 0, 1, 10, null, true, new DateTime(2023, 9, 23, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7365), 1, "Looking for a weekly walk buddy for Milio!", 2 },
                    { 2, null, "Calling all cat lovers! Randy, the charming feline, is seeking a reliable house sitter to provide him with the utmost comfort and care while his humans are away. Your duties include feeding Randy, ensuring his litter box is pristine, and offering plenty of cuddles and playtime to keep him content. Randy's cozy home is your domain during this assignment, making it a purr-fect opportunity to enjoy quality time with a delightful kitty. If you're ready to be Randy's temporary guardian, apply now for this fulfilling house-sitting role!", new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7469), 3, "Szolnok", 1, 2, 20, null, false, new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7467), 1, "House-Sitting Delight: Randy the Cat's Comfy Companion Wanted!", 0 },
                    { 3, "[\"Tue\",\"Wed\",\"Fri\"]", "Are you a dog lover looking for a rewarding side gig? We have an exciting job for you! Join our team to take Luna and Rusty, a delightful pair of dogs (Luna, a charming female, and Rusty, an energetic male), on weekly walks. Enjoy the great outdoors while earning extra income and providing these furry friends with the exercise and companionship they adore. Join us in fostering healthy and happy dogs while making a furry duo's week brighter!", null, 7, "Jászkarajenő", 3, 3, 30, null, true, new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7478), 1, "Weekly Dog Walking Opportunity for Luna and Rusty", 2 },
                    { 4, "[\"Mon\",\"Wed\",\"Fri\"]", "Join the adventure with Luna, the energetic pup! Luna is looking for an enthusiastic pet sitter to accompany her on daily escapades filled with fun and excitement. Your role includes playtime, exercise, and ensuring Luna's safety during your outings. Embrace the joy of being Luna's daily companion and make her tail wag with happiness!", null, 5, "Debrecen", 0, 1, 15, null, true, new DateTime(2023, 9, 24, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7484), 1, "Daily Adventures with Luna!", 2 },
                    { 5, null, "Meet Whiskers, the charming senior cat in need of some extra TLC. Whiskers' owner is seeking a caring house sitter who can provide love, companionship, and attention to their beloved feline. Your daily routine includes feeding, gentle playtime, and ensuring Whiskers is comfortable and content. If you have a soft spot for senior cats and are ready to offer Whiskers a cozy haven, apply now!", new DateTime(2023, 9, 29, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7522), 4, "Budapest", 2, 2, 25, null, false, new DateTime(2023, 9, 26, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7510), 1, "Senior Cat Care: Whiskers' Comfort Companion", 0 },
                    { 6, null, "Calling all canine enthusiasts! Max and Bella, the lively Labrador duo, are seeking an experienced pet sitter to provide them with weekly visits filled with fun and care. As their dedicated caretaker, you'll enjoy their playful antics and cherish the moments spent together. Your responsibilities include feeding, exercise, and ensuring Max and Bella have a fantastic weekly routine. Join Max and Bella on this pawsome journey and create unforgettable memories!", null, 2, "Pécs", 4, 3, 20, null, false, new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7526), 1, "Weekly Labrador Love: Max and Bella's Pawsome Playdates", 3 }
                });

            migrationBuilder.InsertData(
                table: "Pets",
                columns: new[] { "ID", "Age", "Description", "Name", "Species", "UserID" },
                values: new object[,]
                {
                    { 1, 7, "Milio, the seven-year-old dog, boasts a heartwarming mix of wisdom and playfulness, his tail wagging through years of cherished adventures and companionship. His loyal eyes and graying fur tell a tale of unwavering friendship and boundless joy.", "Milio", 0, 1 },
                    { 2, 3, "Randy, the three-year-old cat, exudes youthful energy and curiosity in every graceful leap and stealthy pounce. With his sleek coat and bright, inquisitive eyes, he's a charming feline companion who brings a sense of enchantment to each day.", "Randy", 1, 2 },
                    { 3, 2, "Luna, the two-year-old pup, radiates youthful exuberance, bringing endless energy and an infectious spirit to every moment. With her vibrant personality and sparkling eyes, she's a delightful and energetic companion for any adventure.", "Luna", 0, 3 },
                    { 4, 3, "Whiskers, the three-year-old cat, exudes a graceful charm and inquisitive nature. With a glossy fur coat and sparkling eyes, Whiskers is a delightful feline companion who adds a touch of enchantment to every day.", "Whiskers", 1, 2 },
                    { 5, 4, "Rusty, the four-year-old dog, emanates loyalty and playful energy. With a warm, russet-colored coat and soulful eyes, Rusty is a cherished canine companion who brings joy and adventure to each day.", "Rusty", 0, 3 },
                    { 6, 4, "Max, the energetic four-year-old Labrador, radiates boundless enthusiasm and a love for play. With a sleek, chocolate-colored coat and an ever-wagging tail, Max is a cherished canine companion who brings joy and adventure to every moment.", "Max", 0, 1 },
                    { 7, 4, "Bella, the vivacious four-year-old Labrador, exudes charm and a zest for life. With a shiny, golden coat and bright, sparkling eyes, Bella is a beloved canine companion who adds a touch of sunshine to every day.", "Bella", 0, 1 }
                });

            migrationBuilder.InsertData(
                table: "PetJob",
                columns: new[] { "JobID", "PetID" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 },
                    { 4, 3 },
                    { 5, 4 },
                    { 4, 5 },
                    { 6, 6 },
                    { 6, 7 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_OwnerUserID",
                table: "Jobs",
                column: "OwnerUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_PetSitterUserID",
                table: "Jobs",
                column: "PetSitterUserID");

            migrationBuilder.CreateIndex(
                name: "IX_OwnerProfiles_UserID",
                table: "OwnerProfiles",
                column: "UserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PetImages_PetID",
                table: "PetImages",
                column: "PetID");

            migrationBuilder.CreateIndex(
                name: "IX_PetJob_JobID",
                table: "PetJob",
                column: "JobID");

            migrationBuilder.CreateIndex(
                name: "IX_Pets_UserID",
                table: "Pets",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_PetSitterProfiles_UserID",
                table: "PetSitterProfiles",
                column: "UserID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "IdentityRole");

            migrationBuilder.DropTable(
                name: "OwnerProfiles");

            migrationBuilder.DropTable(
                name: "PetImages");

            migrationBuilder.DropTable(
                name: "PetJob");

            migrationBuilder.DropTable(
                name: "PetSitterProfiles");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "Pets");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
