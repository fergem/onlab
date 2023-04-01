using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class RolesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1c852612-404d-4247-ad60-423ba3f53d97");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6698ff56-328e-4143-8390-b70ddd753202");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "73026e88-ffbd-4b28-84bd-587aa80fad36");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fb5244c3-899b-46a3-b7ce-0f89cd35c865");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6fc0f341-7777-4507-9a93-a830af69f5f1", null, "PetSitter", "PETSITTER" },
                    { "8ac24440-cca6-41f6-af3c-6c50be4a1906", null, "Owner", "OWNER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Age", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Picture", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "0b599815-5e6c-4d65-9be9-b62a50266df8", 0, 43, "779a7302-4dc6-41cc-9f7e-47a7346d12e9", null, false, "Vicc", "Elek", false, null, null, null, null, null, false, null, "495f8c78-ebb6-4c02-9b18-3e4a43d7ffc8", false, "viccelek" },
                    { "ca48d6e7-82f6-4454-b869-2bb92184fde1", 0, 32, "ad05fcaf-dca3-4594-93bf-55cc91007ec7", null, false, "Nagy", "Feró", false, null, null, null, null, null, false, null, "b8df5240-f45a-4038-bba3-4bf76c3b8be7", false, "nagyfero" },
                    { "cdf002ff-89b1-4119-b872-b7071a8d0b67", 0, 17, "53847a8a-1f4a-4d41-b034-fe77fe4f0066", null, false, "Maku", "Látlan", false, null, null, null, null, null, false, null, "ecd4fa42-e3da-4692-abcb-40d86c05dde2", false, "makulatlan" },
                    { "ddbac373-dad0-4a6d-a102-30bbc349d691", 0, 23, "ecbf3e52-4603-4ccd-bc61-87364a3a7652", null, false, "Kiss", "Janos", false, null, null, null, null, null, false, null, "8af245d7-d03a-4987-b572-c01bad84809a", false, "kissjanos" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6fc0f341-7777-4507-9a93-a830af69f5f1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ac24440-cca6-41f6-af3c-6c50be4a1906");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0b599815-5e6c-4d65-9be9-b62a50266df8");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "ca48d6e7-82f6-4454-b869-2bb92184fde1");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "cdf002ff-89b1-4119-b872-b7071a8d0b67");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "ddbac373-dad0-4a6d-a102-30bbc349d691");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Age", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Picture", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "1c852612-404d-4247-ad60-423ba3f53d97", 0, 17, "42ed9234-8f33-4a48-bac7-d437034809db", null, false, "Maku", "Látlan", false, null, null, null, null, null, false, null, "6f1d4ad5-39d4-475a-8049-15415dec4561", false, "makulatlan" },
                    { "6698ff56-328e-4143-8390-b70ddd753202", 0, 43, "c72dfad5-41d1-4db7-b77a-6df251fd129f", null, false, "Vicc", "Elek", false, null, null, null, null, null, false, null, "d895d4c6-9e62-40db-ba0d-81d3554b32c7", false, "viccelek" },
                    { "73026e88-ffbd-4b28-84bd-587aa80fad36", 0, 23, "ab6288df-b0a6-4cdc-9504-1209d8e1e262", null, false, "Kiss", "Janos", false, null, null, null, null, null, false, null, "426fac57-1a52-4501-b586-946cbb018747", false, "kissjanos" },
                    { "fb5244c3-899b-46a3-b7ce-0f89cd35c865", 0, 32, "ae6e5c05-66b9-477e-9990-33374000872a", null, false, "Nagy", "Feró", false, null, null, null, null, null, false, null, "77083d05-c3ba-43ff-8d84-edc687300d55", false, "nagyfero" }
                });
        }
    }
}
