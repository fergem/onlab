using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class seedMoreData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "79fac87e-5122-402a-89c4-66d78104cc5d");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "a4400446-5413-4b52-909d-74d4760bbb8b");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "7446f688-4e94-47ea-936c-77d232362c7c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "4365f275-1983-4589-a522-3b3c00bd32d8");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName" },
                values: new object[] { "e5583638-d108-4216-9281-a6aa10c55246", "VICCELEK" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "91e296c1-f83d-400a-8481-5935afe3e260");

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "185d5943-ce63-47c1-9e58-5a555100e2c3", null, "Owner", "OWNER" },
                    { "7007a2bf-891a-477a-8bb6-03fd01c42e72", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.InsertData(
                table: "Pets",
                columns: new[] { "ID", "Age", "Description", "Name", "Picture", "Species", "UserID" },
                values: new object[,]
                {
                    { 2, 7, "Szep cica", "Miu", null, "Cica", 3 },
                    { 3, 7, "Szep teknőc", "Teki", null, "Teknős", 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "185d5943-ce63-47c1-9e58-5a555100e2c3");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "7007a2bf-891a-477a-8bb6-03fd01c42e72");

            migrationBuilder.DeleteData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "6c963166-418c-4272-b70f-f56e96d45f8f");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "ec77fad2-4af7-426c-a0c3-b86b936d0117");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "NormalizedUserName" },
                values: new object[] { "0aac85d5-395b-437b-aacc-064cc37763b9", null });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "89f2baa2-befc-487b-ac08-75d349ee7180");

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "79fac87e-5122-402a-89c4-66d78104cc5d", null, "Owner", "OWNER" },
                    { "a4400446-5413-4b52-909d-74d4760bbb8b", null, "PetSitter", "PETSITTER" }
                });
        }
    }
}
