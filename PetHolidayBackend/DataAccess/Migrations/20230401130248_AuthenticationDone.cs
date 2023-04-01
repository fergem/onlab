using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AuthenticationDone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "firstLogin",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "23f816ea-a3ca-4c1e-b9e3-76971e53be43", null, "Owner", "OWNER" },
                    { "2cd4fcc6-d963-406f-9ddc-5731b787c8ff", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Age", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Picture", "SecurityStamp", "TwoFactorEnabled", "UserName", "firstLogin" },
                values: new object[,]
                {
                    { "13335308-3ade-4f64-94c8-1bfe7503f4f2", 0, 23, "f025b42a-fa75-45d5-8293-2ce813a7cf1c", null, false, "Kiss", "Janos", false, null, null, null, null, null, null, false, null, "e9902305-0835-49e4-9351-b7bd3fb98520", false, "kissjanos", false },
                    { "255a98d3-f89b-462e-b2aa-109342b3323b", 0, 43, "650bccdd-65d0-42a8-96fb-da45de4eacaa", null, false, "Vicc", "Elek", false, null, null, null, null, null, null, false, null, "a5fdb1ef-def7-4b8b-ab64-ab809a3099ac", false, "viccelek", false },
                    { "71db6c91-de7a-4066-9ebf-ebee25864639", 0, 17, "37dc475b-3d48-4e80-9db0-6eaf425179f1", null, false, "Maku", "Látlan", false, null, null, null, null, null, null, false, null, "8b26b9fb-c9b8-4dd4-98c8-b9f8c139272c", false, "makulatlan", false },
                    { "7a25ba25-3aef-4722-a323-3aefd9f0cb38", 0, 32, "62b1252b-ab6a-4499-947c-09bb79817a78", null, false, "Nagy", "Feró", false, null, null, null, null, null, null, false, null, "784ca813-1060-427b-abb1-798e4cc2894a", false, "nagyfero", false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "23f816ea-a3ca-4c1e-b9e3-76971e53be43");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cd4fcc6-d963-406f-9ddc-5731b787c8ff");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "13335308-3ade-4f64-94c8-1bfe7503f4f2");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "255a98d3-f89b-462e-b2aa-109342b3323b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "71db6c91-de7a-4066-9ebf-ebee25864639");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7a25ba25-3aef-4722-a323-3aefd9f0cb38");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "firstLogin",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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
    }
}
