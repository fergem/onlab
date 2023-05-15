using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class DbJob_seed_updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "72a8324e-9554-4d2b-bad5-e032b4465f78");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "d4d33c48-62c9-41b1-8877-179d5c7d66ce");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "49a579d7-6890-4f1a-aac3-ae386e482453", "AQAAAAIAAYagAAAAEGmUhdB9ja6/T0JrktmqsN+yshgg89tzjTPN1q4voSvQI+XeUZByqoq8Z6+NA022BQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5b870225-ff9c-4a10-8172-616b8006c851", "AQAAAAIAAYagAAAAEF6+ehmgvq1PsYTiURWX7goyEuNXa9+sFFumOjqjUe3BpYPE+fjTvtDkWUxWPVTZKQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "11cf9ed2-c5b8-448d-8ad1-a61d8d5fed64", "AQAAAAIAAYagAAAAELnK6rjI7+IlXT8NGOUbNXMzrFORdEV0tPC0dXtkiYhFVZBsss2W+x7XExP1bo/BqA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "06feb24d-458c-4800-9f1a-969f19cf0ee3", "AQAAAAIAAYagAAAAELYkSYLfELkUxmlmSuPHpXrnPernmzM9YC6ozE3TGFrcrPbup378eUBJUWdZS0wM3Q==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b9a7692-3765-4881-a64c-1bae8683b108", null, "PetSitter", "PETSITTER" },
                    { "dad78a0d-515c-4c8c-9027-19bc30e455b6", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "PetSitterUserID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                column: "PetSitterUserID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "PetSitterUserID",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "0b9a7692-3765-4881-a64c-1bae8683b108");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "dad78a0d-515c-4c8c-9027-19bc30e455b6");

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
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "PetSitterUserID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                column: "PetSitterUserID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "PetSitterUserID",
                value: 4);
        }
    }
}
