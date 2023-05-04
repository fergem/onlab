using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addedPaymentToJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "21cfba42-83b5-4102-a2e2-827c41e450dd");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "ff4d55c4-3db9-42c5-98ed-a016e655d322");

            migrationBuilder.AddColumn<int>(
                name: "Payment",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f725184f-eac0-49f7-96ab-6b912c2afc55", "AQAAAAIAAYagAAAAEBVarxbYaLsL7j7X1ZL8500EIPc5MwjHd0Z4T4em2ZiZyS8KgAr+E9IdfY80cHFxIg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "9d442611-5740-4169-b00e-3505fcf397e1", "AQAAAAIAAYagAAAAEI83MdGpn6ldX9VrX5JBF1dyJ3aIvpoKIkH36iJYvwhWMAdwIOsXuNnyJJzA2kS2vg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a5998e38-08e5-4bd6-a5d7-a64307c74278", "AQAAAAIAAYagAAAAEFhwyQbo8/q+DEQjV3Q7+UXQmVAyps9kinMwayy9c1KSva0bn1QO7je79PEe/kc44A==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6a8eae75-873d-4e9d-b70d-44a760c01e57", "AQAAAAIAAYagAAAAEGV13OHiqIOvpUbxaXSLJZJkaZNe6IWfz2blHNpdgy5wwtQzQcolaWjNW9VJnJGkcA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c4da47b9-701c-4771-977c-e95e2bedf215", null, "PetSitter", "PETSITTER" },
                    { "da6c88df-af50-40d3-bff7-bdc51b4644d1", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "Payment",
                value: 10);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                column: "Payment",
                value: 20);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "Payment",
                value: 30);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c4da47b9-701c-4771-977c-e95e2bedf215");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "da6c88df-af50-40d3-bff7-bdc51b4644d1");

            migrationBuilder.DropColumn(
                name: "Payment",
                table: "Jobs");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "20f4ed99-3ef4-4803-8413-9756d2d9437c", "AQAAAAIAAYagAAAAEGT2URoRt8J+cLQlvg0KqpNknzyoB01QirMCmpytFc+7Gc7TxUw9knW60bcwEMu22w==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6cecb6a6-86a3-4e4a-9d28-5b037f87e827", "AQAAAAIAAYagAAAAEDMW1JNs9EGfh4152VVEN0ff5FoygxBDI52pP0y+zqZv6UPUtDwWQ94EcJagqjt0yg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e7fa2c97-2b29-4439-84eb-a7aa945ee994", "AQAAAAIAAYagAAAAEL7kHAjwRfU9IsJjAkecVmAj0cQimhfkpbOwLnZPC7/T7KC8RsQlJMO9xfYzBTRsBg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f1eede45-5ab7-4a9b-9d80-e66f87a2380f", "AQAAAAIAAYagAAAAEE2cuOrhtOC1UkajPwVsiU/OSJfMu+FgTNsXG5C8eKB6FO4J3+u8MjRnMtOlIPXd2A==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21cfba42-83b5-4102-a2e2-827c41e450dd", null, "PetSitter", "PETSITTER" },
                    { "ff4d55c4-3db9-42c5-98ed-a016e655d322", null, "Owner", "OWNER" }
                });
        }
    }
}
