using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Updated_PetSitter_Profile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "35b7e203-87ed-435d-a8bd-681fd56246f5");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "749e235d-56b0-48d2-8cad-6a75f883d1bc");

            migrationBuilder.AlterColumn<int>(
                name: "MaxWage",
                table: "PetSitterProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AcquiredExperience",
                table: "PetSitterProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MinWage",
                table: "OwnerProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "fb51d5ca-69eb-413c-92af-35152e0e9fb4", "AQAAAAIAAYagAAAAEHKHf9pB3OgzURrVVwW1aAnWEALedBpCdkKG2HtVKie71Y80Y3Q5MprHPtty8gq00g==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "64e7dc60-5b2c-4e6b-a6ae-8f644f851f3c", "AQAAAAIAAYagAAAAEABC/LbRR14umurxJHoRaQBK7ZR9csBg9G3bLzDUGqK6w3fMYLTlJ+QkbsKwsfYsTw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7d355539-297c-4b28-8fbb-ee9b331eabc4", "AQAAAAIAAYagAAAAEOduWhRjge+2cfUOg9rGyeoO/Ce/kQkfrpYTv2IIugIry6QPNmpJub4mXWJmXUQzeQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "61adfa3e-20f3-49c6-82c6-b490ce77ac60", "AQAAAAIAAYagAAAAEJ4BR9Gg2URnIBapL3lSqHtEGLKC5n9bm6pwl94yIB+nBmqXAw0E8moLJKXvOkQVcQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "224b1c13-30dc-4fb1-98d8-988565550992", null, "Owner", "OWNER" },
                    { "2fed9430-004c-4a37-a28f-3cafa9c16a49", null, "PetSitter", "PETSITTER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "224b1c13-30dc-4fb1-98d8-988565550992");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "2fed9430-004c-4a37-a28f-3cafa9c16a49");

            migrationBuilder.AlterColumn<string>(
                name: "MaxWage",
                table: "PetSitterProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "AcquiredExperience",
                table: "PetSitterProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "MinWage",
                table: "OwnerProfiles",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "cf9559d5-1fea-4c66-a1c6-3fab4a20326f", "AQAAAAIAAYagAAAAELzJHJIWeKfYIZ0XVN+EDobrAWhXI9vD6kdj0VYuAz+xWfuyadESImPaXK1/+sLwYw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e9814f14-900c-4fec-b2d4-610a5654b7b6", "AQAAAAIAAYagAAAAEOF8G4/U8iBZAZL9xAFbjJ0H14lQ6doSxxqXf6PMMEEQxNQHs2Ub00rL40tMxgT8QA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c8e6a31a-d41a-48af-9096-4ad9a638b00a", "AQAAAAIAAYagAAAAECNsbqvJqbxhKcId74jjyVmOl8m2bhuoWTjoMpAOufEWT+7ItHpIq9g61zM2oU5Gxw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "76529be5-676e-4a23-9349-4787fd16598f", "AQAAAAIAAYagAAAAEN1i4eMH5AqDPqwznow9etqqsDuEjgNfEoe1c62G8vwvJ9IPHkkkvG3ox/0t7hF6Ng==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "35b7e203-87ed-435d-a8bd-681fd56246f5", null, "Owner", "OWNER" },
                    { "749e235d-56b0-48d2-8cad-6a75f883d1bc", null, "PetSitter", "PETSITTER" }
                });
        }
    }
}
