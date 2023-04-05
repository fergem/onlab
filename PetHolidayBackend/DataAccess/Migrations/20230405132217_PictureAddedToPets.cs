using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PictureAddedToPets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "0a17d40c-6e88-435a-aa5e-0d7f64453a47");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "60df331a-9a3b-433d-86cb-5fc490dd8b0e");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Pets",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "8304460f-97ec-409a-a4ae-84c6fe5b92ae");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "51022d97-5dc9-4d31-b3b6-ed3ffd47e9d2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "ea41f7da-8c1e-493f-adde-56ffc06e09a6");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "6713e84c-b9f1-4dbc-9b30-a5685ac99782");

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0e34d378-9b63-4a43-b14d-ffcbd6bef73f", null, "PetSitter", "PETSITTER" },
                    { "1b5bc07f-6c24-4089-95e0-4938ae0cc96e", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 1,
                column: "Picture",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "0e34d378-9b63-4a43-b14d-ffcbd6bef73f");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "1b5bc07f-6c24-4089-95e0-4938ae0cc96e");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Pets");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "c2480e8f-8f85-4d26-abe1-1aa135aa706d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "a6320b2d-baab-4f1a-b8c1-97f54d6f2456");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "caa67dd6-d3d4-45d3-8504-9cbfb96189b2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "04641515-089a-433e-81f0-a9fb79b21231");

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a17d40c-6e88-435a-aa5e-0d7f64453a47", null, "Owner", "OWNER" },
                    { "60df331a-9a3b-433d-86cb-5fc490dd8b0e", null, "PetSitter", "PETSITTER" }
                });
        }
    }
}
