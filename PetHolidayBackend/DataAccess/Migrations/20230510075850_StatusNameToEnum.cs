using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class StatusNameToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c4da47b9-701c-4771-977c-e95e2bedf215");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "da6c88df-af50-40d3-bff7-bdc51b4644d1");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Statuses",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "034a0440-f349-47fa-b651-3f9d86abc86b", "AQAAAAIAAYagAAAAENtFhH9PVnpad58uSTzIxOK8BwilIH9va+3BQgpCanP6sH/6DrYPgiK0rTl8YFojyg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "8f40d0d4-ceff-4bb0-8966-a217963d4e60", "AQAAAAIAAYagAAAAEPFCTWgmplqQ4aEwDkq1TLyyZCJNnEumjb/XZj4/jUjH0fMqKc+iTnnz9186y4Oavw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c450d51e-04ff-4b60-a2de-b8855e99a82b", "AQAAAAIAAYagAAAAEC8RQDFcd6nmd4WgDMrrOr2stgMGtNWAROHjGMzBthS8D7ktoMjejQVnEm7tCLnkjA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "47f82d83-194d-410d-a9ca-10f288474ce3", "AQAAAAIAAYagAAAAEIkmKGdcfm+tS6lKPT3um+Vf3mYUhBD5FXVGLHtXjTY9+kTdX0GXzIaJvRSmmGnFJg==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "52a84995-a9f1-40bf-8b92-1009a714ce0a", null, "PetSitter", "PETSITTER" },
                    { "c2f146d3-4986-474a-9082-7fbd8d7faf7b", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "ID",
                keyValue: 2,
                column: "Name",
                value: "Inprogress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "52a84995-a9f1-40bf-8b92-1009a714ce0a");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c2f146d3-4986-474a-9082-7fbd8d7faf7b");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Statuses",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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
                table: "Statuses",
                keyColumn: "ID",
                keyValue: 2,
                column: "Name",
                value: "In progress");
        }
    }
}
