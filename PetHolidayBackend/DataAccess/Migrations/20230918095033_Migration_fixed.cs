using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Migration_fixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "99a302e7-f776-429f-a137-65592442393d");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "ba4297d3-7acb-45af-8978-2b6482761231");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "9d75cd1e-2fa6-4ac9-84fe-010ddb5f725b", "AQAAAAIAAYagAAAAEI3PEqBtx0H+LiWQn9z+r9t/Ky8mAC99qGScd9L5qeuM7kNcjwRU8K6yMVh1qdHTaQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "93949c59-89f4-428d-a8b9-8a441978387f", "AQAAAAIAAYagAAAAEGXYdlxZPWpPD9XfaQlr3FV7FxQyBc2LbNw0mkvhgcFcBRGyM2fKdQjy6D5bYg4OmQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2deff03a-a673-4f48-940a-bb2be839b648", "AQAAAAIAAYagAAAAEAQL8ghf/YiRaO4UV3M4FHkiNumE2URx14dRWCzFJQlpKf2GOrKQ0pf1kTOwTjzfKQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ff4aec86-9f59-4713-9438-55c315755a3a", "AQAAAAIAAYagAAAAEOAczVuNW1ocVmQQ13xVg9pIzqaEWxfblouM7/15Il4OTkuTGGayDz4vPgqwqR7muA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b6737beb-ff76-4b4d-a2cc-ba2b9a219514", null, "Owner", "OWNER" },
                    { "fa6bf0e5-c863-4d89-8513-f576b4bc9a52", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Days", "StartDate" },
                values: new object[] { "Mon,Wed,Fri", new DateTime(2023, 9, 20, 11, 50, 33, 247, DateTimeKind.Local).AddTicks(9009) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 9, 22, 11, 50, 33, 247, DateTimeKind.Local).AddTicks(9778), new DateTime(2023, 9, 22, 11, 50, 33, 247, DateTimeKind.Local).AddTicks(9763) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 9, 21, 11, 50, 33, 247, DateTimeKind.Local).AddTicks(9825));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "b6737beb-ff76-4b4d-a2cc-ba2b9a219514");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "fa6bf0e5-c863-4d89-8513-f576b4bc9a52");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "30135e11-c193-41e3-9334-0c26d2551d43", "AQAAAAIAAYagAAAAEKoug6cKOUFbf9E+aMlyj+qrHe7tqJGTlYcX1SJMSa7KUEcEkU9HXJ5H3l02Ja4hwQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "8710f9e5-3372-4891-a2b7-dd8f1010dd7d", "AQAAAAIAAYagAAAAENxv7er/xC/JIJflwfcVRM+4V1K9Pljl+F301H02poP+uiuTMmN2VoWzcf9xNKjnBQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7440dae1-1250-4b3c-ba1e-7a89d5161add", "AQAAAAIAAYagAAAAEEP7weuWH/mZPuCenrbT6DnCsEez+Y9iTV3AnmRbsP7R96HvN0YYVlYWw4Wi+BS+gw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "1121e639-68bb-462d-9d23-1f267a6919da", "AQAAAAIAAYagAAAAEPpDI7C/B2HEcIIMC3adjX8COEuXJtwPuvtDqf9jf3QVbVi8VslbF7IB8jJo66oafA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "99a302e7-f776-429f-a137-65592442393d", null, "Owner", "OWNER" },
                    { "ba4297d3-7acb-45af-8978-2b6482761231", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Days", "StartDate" },
                values: new object[] { "Mon,Wen,Fri", new DateTime(2023, 9, 20, 11, 37, 52, 676, DateTimeKind.Local).AddTicks(9638) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 9, 22, 11, 37, 52, 676, DateTimeKind.Local).AddTicks(9698), new DateTime(2023, 9, 22, 11, 37, 52, 676, DateTimeKind.Local).AddTicks(9696) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 9, 21, 11, 37, 52, 676, DateTimeKind.Local).AddTicks(9704));
        }
    }
}
