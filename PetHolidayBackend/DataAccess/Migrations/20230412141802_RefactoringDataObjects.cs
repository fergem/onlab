using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class RefactoringDataObjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "27d42b69-17ed-41f5-a979-2304937a8f31");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "6695bb84-1552-4237-b012-3cd8415185b8");

            migrationBuilder.DropColumn(
                name: "firstLogin",
                table: "AspNetUsers");

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
                column: "ConcurrencyStamp",
                value: "0aac85d5-395b-437b-aacc-064cc37763b9");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "79fac87e-5122-402a-89c4-66d78104cc5d");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "a4400446-5413-4b52-909d-74d4760bbb8b");

            migrationBuilder.AddColumn<bool>(
                name: "firstLogin",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "firstLogin" },
                values: new object[] { "8a2f4455-69b1-448f-8280-714aa1eac798", true });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "firstLogin" },
                values: new object[] { "ed0572b6-9cd5-44e2-ab05-f3637866b0b7", true });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "firstLogin" },
                values: new object[] { "36b3f424-96a0-4ce6-ab9a-56b832b9c063", true });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "firstLogin" },
                values: new object[] { "81e87d10-bebe-40d1-bb3b-332b4ae9e71d", true });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "27d42b69-17ed-41f5-a979-2304937a8f31", null, "PetSitter", "PETSITTER" },
                    { "6695bb84-1552-4237-b012-3cd8415185b8", null, "Owner", "OWNER" }
                });
        }
    }
}
