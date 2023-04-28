using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PetOnlyHasOnePicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PetImages_PetID",
                table: "PetImages");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "b783dca5-03c0-46ec-9a30-f861bf48a727");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "ed58905d-4279-414f-a24c-e9e8d3e6d8d0");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0216e167-b747-4123-aa66-1cfccd24cfe6", "AQAAAAIAAYagAAAAEJLjRyr6Y7tqb1sS0MSA1oJWARfygNTYNncfJMsnAedwljXb5nTPXpgbt4T15PWwiA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "4be821d7-f0c9-433d-bf55-8aa63c412f41", "AQAAAAIAAYagAAAAENYI4GIGIqtXMvRBbFqdu2MXsX5Ef1URgTXATJgf9ZMs/KvlVlVzNK4/NPVSFWpJ0Q==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e5c8dbf4-2917-4ac5-9500-3a965e23ae05", "AQAAAAIAAYagAAAAEDU2V2zOz7DE1N7xAkEjeVKPCN6+sMQbB4nn1Q7EledslNaobwN8xuZuMotq8JK9qQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "cb61bf6f-8820-4006-bc31-c4b63bdca142", "AQAAAAIAAYagAAAAENmLhRtU+pXpOT/SqmYhb381T9miy6rdWbDSrVDBDMxyx+P7N4sbIlU70zPDUvFfFA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d4de4112-77c6-4b16-b528-eb0e29d4a3e5", null, "Owner", "OWNER" },
                    { "fd101da1-db39-4ba8-a522-7246f08bf290", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetImages_PetID",
                table: "PetImages",
                column: "PetID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PetImages_PetID",
                table: "PetImages");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "d4de4112-77c6-4b16-b528-eb0e29d4a3e5");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "fd101da1-db39-4ba8-a522-7246f08bf290");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0957f726-f578-4057-903b-abe1b7b07a32", "AQAAAAIAAYagAAAAELRtfns6MH7JEqziEQMBxlx6XgaIYtSHrSrnrRAwhX/zGQUfyZG95vTZW4nm8PRRtg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7d3c47e8-0b1e-41c8-8db9-8c4655036cb8", "AQAAAAIAAYagAAAAEJnKAoFz9KY7fdXCpzugWXqbMnbg3k/oQc+GEqSa+QCRFJpy2Nm4X4QOfKcIm94xjA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "3d1bbf46-e982-4cbe-98a8-9b605bf4bc35", "AQAAAAIAAYagAAAAEAIkwaL7wGh1dcl50fFabf9Rd8gMDb1Q7suAhSnrPSwKYV4K0dV5O+e1cjp6qLGg7Q==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "35f03148-d991-4343-ab45-ec2fc97eb066", "AQAAAAIAAYagAAAAENhOEviW6PNsO0DFqDP/D0uZx0tIJ9/ownNr1yVc1Op54zP25GI4nUMOeGoWWXrIog==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b783dca5-03c0-46ec-9a30-f861bf48a727", null, "Owner", "OWNER" },
                    { "ed58905d-4279-414f-a24c-e9e8d3e6d8d0", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetImages_PetID",
                table: "PetImages",
                column: "PetID");
        }
    }
}
