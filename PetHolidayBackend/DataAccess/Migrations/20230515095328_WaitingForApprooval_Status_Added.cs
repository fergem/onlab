using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class WaitingForApprooval_Status_Added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[] { "0a311dad-d645-4fac-b4d8-c07226a89970", "AQAAAAIAAYagAAAAEMtRiTEw/Ef3B+BvcTMvZqbSCd2dtfSUoL/U8pLrlDIMn/PqCPQ2UhG3DrzUM2GecA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ae6d0dab-1623-4e8a-aba6-f795fd441a8d", "AQAAAAIAAYagAAAAEG+KOZ5pap9OlTmIAk8MganrmWIlUpbM5DJwcOVDsZopjOFW2qc7foAhKg9eXH8xqA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "fa255184-a47f-4799-b320-36cc4e9095b2", "AQAAAAIAAYagAAAAEB/1koeEgutK6h6uS+Sp/LRP8bcqZ5fx3+rU71CLhwIWx+EbVQq5C1XxV89qZDSPsw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5e5a385c-2a48-42a0-af1a-e382724faa66", "AQAAAAIAAYagAAAAELrCtiT1EIxHJQo86cPh3qbLc2SCDQYX3UX8VdAxXaG3jmqo2qlM9QI5cftRdGZQZQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "72a8324e-9554-4d2b-bad5-e032b4465f78", null, "PetSitter", "PETSITTER" },
                    { "d4d33c48-62c9-41b1-8877-179d5c7d66ce", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "ID",
                keyValue: 2,
                column: "Name",
                value: "WaitingForApproval");

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "ID",
                keyValue: 3,
                column: "Name",
                value: "Inprogress");

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "ID", "Name" },
                values: new object[] { 4, "Done" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "72a8324e-9554-4d2b-bad5-e032b4465f78");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "d4d33c48-62c9-41b1-8877-179d5c7d66ce");

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "ID",
                keyValue: 4);

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
                table: "Statuses",
                keyColumn: "ID",
                keyValue: 2,
                column: "Name",
                value: "Inprogress");

            migrationBuilder.UpdateData(
                table: "Statuses",
                keyColumn: "ID",
                keyValue: 3,
                column: "Name",
                value: "Done");
        }
    }
}
