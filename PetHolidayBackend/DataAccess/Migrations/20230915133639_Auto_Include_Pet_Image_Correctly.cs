using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Auto_Include_Pet_Image_Correctly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "03e6b264-87a1-4021-a294-ca4ba4d4e83d");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "76619453-81cd-41a5-af0c-76c9ca5784f8");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "bf4d0b2a-5801-4f3b-9085-31f3666e71e2", "AQAAAAIAAYagAAAAEJBGi2cpHzXVvxffNTJWb6cGpt7hmcrkc8+jFGrLYrcFpzqedJ9FRTMfkHjUJk8Zkw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2d2597dd-f222-4a04-a7f6-64b58582f9ff", "AQAAAAIAAYagAAAAEFzif6owhmvt0X5NUZKkiQxqe1qUS+bvFpJ6pTNBfY6jtl2bo8aAXNFE2VQWapqAdA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e54ecdd8-c200-48a3-8b0f-d912cf4a06a3", "AQAAAAIAAYagAAAAEPk7WEGFk1gzN3VUTIbpRQS+bHy6z5tNdDlanZTcDXqGhxV8FhfXbeHbDSYxejvlsA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "aaec287c-f972-4008-8964-820435368043", "AQAAAAIAAYagAAAAECNO3XwsqlD6vntwd4x+acPUmS849T6N2gd8N2NlRp1HRIXQB098LS6L5GQ2ofNztQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c133a497-a119-49f2-8ea1-3b611195428e", null, "PetSitter", "PETSITTER" },
                    { "e324380f-c4be-414f-8b95-138dcc8f757b", null, "Owner", "OWNER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c133a497-a119-49f2-8ea1-3b611195428e");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "e324380f-c4be-414f-8b95-138dcc8f757b");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2f718039-505c-401d-b321-173cdc2661ae", "AQAAAAIAAYagAAAAED9ai2k1fdUXp/8OoLE6GSr8szBsriZUFWf9hHSdLJ3tqHEZMRH9n2hvVYw5ddJ6AQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "747c99cb-fc13-4274-8be0-b2189506aaa5", "AQAAAAIAAYagAAAAEHvr3MTqRmjXnK376FpxbDyDj9LY4yWWlhlpgWNld0npVdntGJ01LlrGsiSLaUM5rA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "efb87f48-b5f6-4b32-941a-29892815b46c", "AQAAAAIAAYagAAAAEHkbqatC5mlq8P7PFLPSsMIrT5FfSC30MdakSnTpg/xX7aiMuBXDx9OTby2o89uxWw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "64984df1-ca6f-4d2b-97a9-b44941fbe000", "AQAAAAIAAYagAAAAEHTgs+hWRFwist2xeco7xk7q2L83RWTeSTLeyBXQB9bQNGbARVl/kjnVHIpN2GYAxA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "03e6b264-87a1-4021-a294-ca4ba4d4e83d", null, "PetSitter", "PETSITTER" },
                    { "76619453-81cd-41a5-af0c-76c9ca5784f8", null, "Owner", "OWNER" }
                });
        }
    }
}
