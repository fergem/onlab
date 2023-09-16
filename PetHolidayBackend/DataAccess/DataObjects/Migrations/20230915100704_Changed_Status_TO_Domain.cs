using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Changed_Status_TO_Domain : Migration
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
                values: new object[] { "e5b4858a-d8cf-42dc-9791-a16c4e399b0a", "AQAAAAIAAYagAAAAECTbyXLa0VDotvyxpR1na7m0eOFcRM6WA/wZ6k+tWVuhUTdarzMgvxMNFMvNkyHYBw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "43c1fd83-11a0-4c95-a234-fa16ca2db425", "AQAAAAIAAYagAAAAEGrU4wCA84pzPX4HQNxwzT8+eLlGtMhmgDlfVIm6QDb4RP+j8J/R4WrGbGqtVM+SGA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "85ebd9c2-2809-4e8f-8cd3-da48cf665dc3", "AQAAAAIAAYagAAAAEN9u+g7Vji4q0thLSpQQEKuBRwIhzajnroW/MO6eQ8iiuhGBVcKdZUVQTFjqJvZwZg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "8b50a0db-fe31-4f98-88cb-a7308bfb1259", "AQAAAAIAAYagAAAAEGsYl4GgzjDZBv+HGuUwDJ6rKzKIwnIuwgBtHsv5F5VsOhjDG3CFL0HpV2JZ8YVyaw==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2ac673ce-42d6-47cc-96ec-3ccdb0d2e6dc", null, "PetSitter", "PETSITTER" },
                    { "4d6454f0-286d-4255-9094-845667e9b937", null, "Owner", "OWNER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "2ac673ce-42d6-47cc-96ec-3ccdb0d2e6dc");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "4d6454f0-286d-4255-9094-845667e9b937");

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
