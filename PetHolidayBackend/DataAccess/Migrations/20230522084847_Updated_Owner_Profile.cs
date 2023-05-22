using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Updated_Owner_Profile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "0b9a7692-3765-4881-a64c-1bae8683b108");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "dad78a0d-515c-4c8c-9027-19bc30e455b6");

            migrationBuilder.RenameColumn(
                name: "RequiredExperience",
                table: "OwnerProfiles",
                newName: "Location");

            migrationBuilder.AddColumn<int>(
                name: "MinRequiredExperience",
                table: "OwnerProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinRequiredExperience",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "MinRequiredExperience",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                column: "MinRequiredExperience",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "MinRequiredExperience",
                value: 3);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "35b7e203-87ed-435d-a8bd-681fd56246f5");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "749e235d-56b0-48d2-8cad-6a75f883d1bc");

            migrationBuilder.DropColumn(
                name: "MinRequiredExperience",
                table: "OwnerProfiles");

            migrationBuilder.DropColumn(
                name: "MinRequiredExperience",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "OwnerProfiles",
                newName: "RequiredExperience");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "49a579d7-6890-4f1a-aac3-ae386e482453", "AQAAAAIAAYagAAAAEGmUhdB9ja6/T0JrktmqsN+yshgg89tzjTPN1q4voSvQI+XeUZByqoq8Z6+NA022BQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5b870225-ff9c-4a10-8172-616b8006c851", "AQAAAAIAAYagAAAAEF6+ehmgvq1PsYTiURWX7goyEuNXa9+sFFumOjqjUe3BpYPE+fjTvtDkWUxWPVTZKQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "11cf9ed2-c5b8-448d-8ad1-a61d8d5fed64", "AQAAAAIAAYagAAAAELnK6rjI7+IlXT8NGOUbNXMzrFORdEV0tPC0dXtkiYhFVZBsss2W+x7XExP1bo/BqA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "06feb24d-458c-4800-9f1a-969f19cf0ee3", "AQAAAAIAAYagAAAAELYkSYLfELkUxmlmSuPHpXrnPernmzM9YC6ozE3TGFrcrPbup378eUBJUWdZS0wM3Q==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b9a7692-3765-4881-a64c-1bae8683b108", null, "PetSitter", "PETSITTER" },
                    { "dad78a0d-515c-4c8c-9027-19bc30e455b6", null, "Owner", "OWNER" }
                });
        }
    }
}
