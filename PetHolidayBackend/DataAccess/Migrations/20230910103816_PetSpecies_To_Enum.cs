using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PetSpecies_To_Enum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "6ab9ca39-0d5c-4414-879f-960e201be34f");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "98246adb-0f3b-4a80-a263-3fe02d87dc2c");

            migrationBuilder.AlterColumn<int>(
                name: "Species",
                table: "Pets",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e5ac7390-9ce5-44ec-b53f-d1ce4f86e404", "AQAAAAIAAYagAAAAEGR0SxxsJN67LQL6IDYouc1Ft2Ma4DwSvzzzCCH19CBLtotmF2ppyFAa6CRqe0lcWQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0a0c565c-3a20-40cb-9231-966b8c9396b8", "AQAAAAIAAYagAAAAEE1Maf9y16I64tqMeMwzWPUcHZoEPXw4bSjDxA2dMX2F6WX0gUI06TJD/AP0lIYoAA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f9f49ad1-cab1-44ec-8f8a-554043a48be6", "AQAAAAIAAYagAAAAEEV5mmdTweNycBhsHLPisvJRkJKBJD9FK/AzfcjjpkqcgLVHUVG1PuxvCx/JNKqt/A==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "84b26730-7a0e-4bfa-8dbd-f730a99685b9", "AQAAAAIAAYagAAAAEKxz7XDPBz3KOTr+gentzJxc7V6rQd1Sni5QKRcSfMCvObN6qak7hGMBtvzpJavqKw==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "04242c0a-8372-4aad-a3fd-426ca870437b", null, "Owner", "OWNER" },
                    { "67890801-5609-4205-90be-260730cb0234", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Age", "Species" },
                values: new object[] { 2, 0 });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Age", "Species" },
                values: new object[] { 3, 1 });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "Description", "Name", "Species" },
                values: new object[] { "Egy nagyon nagy ló", "Ló rider", 3 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "04242c0a-8372-4aad-a3fd-426ca870437b");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "67890801-5609-4205-90be-260730cb0234");

            migrationBuilder.AlterColumn<string>(
                name: "Species",
                table: "Pets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6a8cba7c-f7cf-48d2-b58e-0def19a32510", "AQAAAAIAAYagAAAAECf3xwK5iEZd9WHvPW+Wh8QCWDXAfc1MZJVKMyQXivUGCW1pAr3wZkXpjf5XSQ154w==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a16b865a-ec91-4c45-bce5-4f2f76947e9d", "AQAAAAIAAYagAAAAEJKPg37JY1NRL1FfAmQ/VYhOM17hZPVsSYPxPDSj4/WMqhTXk2YiHVc9u5b6viSVkQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "980140dd-10e5-4868-8671-f1a7988cf0af", "AQAAAAIAAYagAAAAEOZ2M75usH+Y6PYIdpJLzkMjo81gzXaV69hFD6K7atGIto8REN4O2a81GcvlDS6C4g==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a1250540-9102-4aee-844f-d94ce999eb5e", "AQAAAAIAAYagAAAAELIJN9/CGyLQQgpmW6VbMLJMMsBPHcZCQU4tLAA4qYjY/W/Q59gTx6f5yUOADx4o1Q==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6ab9ca39-0d5c-4414-879f-960e201be34f", null, "Owner", "OWNER" },
                    { "98246adb-0f3b-4a80-a263-3fe02d87dc2c", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Age", "Species" },
                values: new object[] { 7, "Kutya" });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Age", "Species" },
                values: new object[] { 7, "Cica" });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "Description", "Name", "Species" },
                values: new object[] { "Szep teknőc", "Teki", "Teknős" });
        }
    }
}
