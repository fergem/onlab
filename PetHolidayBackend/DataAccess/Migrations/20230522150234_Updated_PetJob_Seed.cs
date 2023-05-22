using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Updated_PetJob_Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "cd269255-4c32-4a40-9a4f-0e853e72ef0b");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "f71a302f-0d35-4a71-9d62-d2045db2dec6");

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

            migrationBuilder.InsertData(
                table: "PetJob",
                columns: new[] { "JobID", "PetID" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "6ab9ca39-0d5c-4414-879f-960e201be34f");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "98246adb-0f3b-4a80-a263-3fe02d87dc2c");

            migrationBuilder.DeleteData(
                table: "PetJob",
                keyColumns: new[] { "JobID", "PetID" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "PetJob",
                keyColumns: new[] { "JobID", "PetID" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "PetJob",
                keyColumns: new[] { "JobID", "PetID" },
                keyValues: new object[] { 3, 3 });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7705293c-496b-4164-ab66-41ca32a460a9", "AQAAAAIAAYagAAAAEMNYOhWsMZeOPAP3Dqd3wq5K3xKb9AM6EYEN0F1esYdtAbeWfpUe6dU63+TpcR73WQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ecec3f50-09ee-4432-b1d1-adc9fb034331", "AQAAAAIAAYagAAAAEBF+TyYNlW/No89gburoR3EEjTY/sRZC9RXamRxC5GUG/2a0lsKxhJ8xA+PADXQonw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "b3d29971-5c0e-403a-a65f-f0d10da2d5fd", "AQAAAAIAAYagAAAAEEWj8oRCQQp9sIAGVUbS6ziWpLiHCRWPPfLcJ0hgm7SJNMjOq7RWftGxhzeZGJAYCw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "135f9a1f-4e54-4b3e-9062-f061951dbd8e", "AQAAAAIAAYagAAAAEHQJbgRUqzjNyOKnTho1rFIp9d1CkUgEXNPyzt41zPNb7RPjarTJ23iwuEUBHt0LwQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "cd269255-4c32-4a40-9a4f-0e853e72ef0b", null, "PetSitter", "PETSITTER" },
                    { "f71a302f-0d35-4a71-9d62-d2045db2dec6", null, "Owner", "OWNER" }
                });
        }
    }
}
