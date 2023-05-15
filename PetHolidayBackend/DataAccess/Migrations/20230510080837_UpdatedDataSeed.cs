using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedDataSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "52a84995-a9f1-40bf-8b92-1009a714ce0a");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c2f146d3-4986-474a-9082-7fbd8d7faf7b");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c2150a98-7936-48e6-85e7-dcc86e2bfd20", "AQAAAAIAAYagAAAAEAa/lB3X/qzKht6SfupOzc9ybmSEsh0aRnHBBH/Lw6S7j3/1UBKJbnpCDPyA7Fkdkw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "cb891b8c-2882-4779-8c49-8f1694ac97dc", "AQAAAAIAAYagAAAAEF/ceHEjWiIIrszYSUabMY3bXoL1ZW855FVL8A1dgegoGAVPbEfqC+nJMW7GnhWGXw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d79543d5-9f9c-4a0c-b0e1-7a690d0744f4", "AQAAAAIAAYagAAAAEFG8rLvTgAEwbNx9LKRU3PVZp0Bdi4BEGgstE00X6kM86CUXmEfn5QFQXiD5NTfYJg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c0c7bd98-5fbd-4e20-af41-fd50db314847", "AQAAAAIAAYagAAAAEJbOj25Ujtn0wnJXM8YNZNGCYaOq/uS8yKs39ynzyVoPfVjrRZmULvxWA7m7+IG5QQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1a8912f4-c0ab-495a-a758-5191a6237c1f", null, "PetSitter", "PETSITTER" },
                    { "1b7602ab-344f-4757-8986-b8aa36867ff4", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StatusID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                column: "StatusID",
                value: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "1a8912f4-c0ab-495a-a758-5191a6237c1f");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "1b7602ab-344f-4757-8986-b8aa36867ff4");

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
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StatusID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                column: "StatusID",
                value: 2);
        }
    }
}
