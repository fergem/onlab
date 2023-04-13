using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class seedPasswordForUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "185d5943-ce63-47c1-9e58-5a555100e2c3");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "7007a2bf-891a-477a-8bb6-03fd01c42e72");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash" },
                values: new object[] { "3b390ca1-36ca-42b4-a1fe-68159bc4c87e", "KISSJANOS", "AQAAAAIAAYagAAAAEO1kHCy/0J8tTBBlySFMg1qxRawv+Z5wZBHRNtKAKiISg4ASUWXe4zMCiAAZFtpp7g==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash" },
                values: new object[] { "9607b686-d350-4b0f-9e68-38c693a0bd13", "NAGYFERO", "AQAAAAIAAYagAAAAEMMS1fQ12LiXfrGTK+6DqsbuRuIOrbG3tYWlPzHlASF40E8jHKnnYYofFg1l00FZzg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ef7d36a3-2775-4ee0-86f4-d4d0ccb40e9d", "AQAAAAIAAYagAAAAECCnsbWFr8p88ApKmwSbnx0wlR55/yFlfMUda6WfCU56ABG8lJaR7N6DHm8H+re/gQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash" },
                values: new object[] { "45a1f4f0-1ad1-4cb5-bf3c-c3d6e4f7334a", "MAKULATLAN", "AQAAAAIAAYagAAAAEANK80EjzeXUH+kOeYBAG+5Y0I+TbbGjXxdVInvrBeRkY0diHq7Psx6P6DX76BnjSg==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "83e0f3aa-df2c-4b41-a71f-689e1a2efeab", null, "Owner", "OWNER" },
                    { "ed19bf3f-ae27-42ed-88c3-4c2dcea70aa7", null, "PetSitter", "PETSITTER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "83e0f3aa-df2c-4b41-a71f-689e1a2efeab");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "ed19bf3f-ae27-42ed-88c3-4c2dcea70aa7");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash" },
                values: new object[] { "7446f688-4e94-47ea-936c-77d232362c7c", null, null });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash" },
                values: new object[] { "4365f275-1983-4589-a522-3b3c00bd32d8", null, null });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e5583638-d108-4216-9281-a6aa10c55246", null });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName", "PasswordHash" },
                values: new object[] { "91e296c1-f83d-400a-8481-5935afe3e260", null, null });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "185d5943-ce63-47c1-9e58-5a555100e2c3", null, "Owner", "OWNER" },
                    { "7007a2bf-891a-477a-8bb6-03fd01c42e72", null, "PetSitter", "PETSITTER" }
                });
        }
    }
}
