using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Redefine_status : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "7c80ab50-a546-43c9-9028-ae1e6ac1585d");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "bdfdca8d-f5fb-4162-9dfe-f5289bfdcaa8");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7c8bd399-6b50-48a4-9a9a-d3db100337e1", "AQAAAAIAAYagAAAAEJkgMmCkFAHsmXdQRdthPxZGPEAQsIhm2Ohoz4zUncnuzFIO3y5QlPdxTSTHejzJ5A==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "25e157f5-bd77-4781-9574-45a0cc1e6c54", "AQAAAAIAAYagAAAAEBrTsfQXQgVPh/6UR+/S7KcvNvxKZyG6EqodzvlhJ+GfzqHj0Le+HjQh0CU1ecc9+A==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "542d5d97-129a-4602-bb10-8535590fac1f", "AQAAAAIAAYagAAAAEFpIpLV1BZiwR8jMkJtXv9axE7t4blC+EM8QiEuMpAMK+4yxFkHgsF+3BOMq6JE++w==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7d8f3d23-facf-4743-8ec9-7c059c490169", "AQAAAAIAAYagAAAAEMEvFvlQWU3OhNGKqZs3uA+yI6HrmwVf5QxmdBD2TInwqxKeCiJ9w35nn9EUaQNOUA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "16d0efe4-731d-48c0-832c-8c7fe3727bdc", null, "PetSitter", "PETSITTER" },
                    { "b5d2f748-76e6-4cef-bc6e-6b7b23d5602b", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 2, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(888));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 4, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(1086), new DateTime(2023, 10, 4, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(1084) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 4, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(1097));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 3, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(1103));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 8, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(1135), new DateTime(2023, 10, 5, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(1126) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 4, 17, 3, 27, 427, DateTimeKind.Local).AddTicks(1140));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "16d0efe4-731d-48c0-832c-8c7fe3727bdc");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "b5d2f748-76e6-4cef-bc6e-6b7b23d5602b");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "52dbad8b-ae66-4bb7-b775-26e724878534", "AQAAAAIAAYagAAAAEKAxrRqfz5ACKaQOA49fHoohDY/eB0C4GQEKTMSpwb9pCviWsCPlAuPKxYzE0Y7RJw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "fff3f9f9-9542-4f4c-99ba-dc8599a736f2", "AQAAAAIAAYagAAAAEPNlGU5iikuIwVNhLw5GZyoY9GRS+KGt27oE2zDM8BJL2v5UxUCsDudKswjYf2tmXw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "115915ab-2b49-4918-85e9-cd5e95c3c926", "AQAAAAIAAYagAAAAEEgNf/5xnyzREp4FBb802kHD+bqNLGD0+391q5/wdGzxlu6EPL9qpsZTBXucGATvaQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "b0a9ca6b-5f08-40dc-83a8-18c8963afdfd", "AQAAAAIAAYagAAAAEMNPn1ltNh72yjYnmFpqL34bSROdGj/EEt1TrwevPS6k6Q0elxEx09/sNRtvmLDLig==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7c80ab50-a546-43c9-9028-ae1e6ac1585d", null, "PetSitter", "PETSITTER" },
                    { "bdfdca8d-f5fb-4162-9dfe-f5289bfdcaa8", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 9, 23, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7365));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7469), new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7467) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7478));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 9, 24, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7484));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 9, 29, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7522), new DateTime(2023, 9, 26, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7510) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 9, 25, 21, 26, 41, 528, DateTimeKind.Local).AddTicks(7526));
        }
    }
}
