using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Updated_User_Profile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "224b1c13-30dc-4fb1-98d8-988565550992");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "2fed9430-004c-4a37-a28f-3cafa9c16a49");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "Location", "PasswordHash" },
                values: new object[] { "fe94dd41-ffc1-4ac9-87e8-164dc4d472db", null, "AQAAAAIAAYagAAAAEEb+o0B9+wtE+Eug9nZNRH6R+NWTVTC0tdLQ/TRs6M91YT0EenXtnTCWMq5OizZuMg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "Location", "PasswordHash" },
                values: new object[] { "1ab6e295-2850-4fc4-bf60-9a70cae250d2", null, "AQAAAAIAAYagAAAAEDaav6qjhn3WuKOTLqIWlJs02G0CxF/6QiZTEaBnPZHOb6DhbC6iAuNWX1BCHCfGhA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "Location", "PasswordHash" },
                values: new object[] { "64360450-53a9-456b-9989-0023fefa7596", null, "AQAAAAIAAYagAAAAEDqrVdWDf6yOPppfkwSA6COAY06xtX4gBVO+qdOACv3Z7qjXrCeOlK2Ak3jZdf/pYQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "Location", "PasswordHash" },
                values: new object[] { "6ca968df-3453-41ce-a754-37cf18a8dbd6", null, "AQAAAAIAAYagAAAAEMthW2nCVdY70Gyp8kW34rcl4OUOUfStqRbn2kxJ8AhcS3W9BzTtPjHq4QdLWRyGVw==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "07832c7e-ad12-4ffa-adfd-b386ce969db3", null, "Owner", "OWNER" },
                    { "59592aa5-942d-4b38-906b-a88956b5dcf9", null, "PetSitter", "PETSITTER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "07832c7e-ad12-4ffa-adfd-b386ce969db3");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "59592aa5-942d-4b38-906b-a88956b5dcf9");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "AspNetUsers");

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
    }
}
