using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Remove_PetSitter_From_Job : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_PetSitterUserID",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "7a5b1fd8-f43f-4b37-9fd7-8f25a597e077");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "a71e93b1-53d5-46cb-a03e-9ec25811c804");

            migrationBuilder.DropColumn(
                name: "Hours",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "PetSitterUserID",
                table: "Jobs",
                newName: "DbUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_PetSitterUserID",
                table: "Jobs",
                newName: "IX_Jobs_DbUserId");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0872bdf9-c98b-4513-abb1-b94d14e97d28", "AQAAAAIAAYagAAAAEPSKOiPa0WkJlEtHeAx6zvRoJ+j39aEZoEcbDD5dwSl2OTJHPyNaxx/9wTc3ftK1XQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d8e6de18-2920-4ed2-a6c9-8539a8eee5a9", "AQAAAAIAAYagAAAAEGQcNtq+I9n+DAc0cAcRgnzKchzLHLVDmz13YY/I6F+DPnPR40SVFopBpXu+azbqFg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "719c1078-6f0e-47df-84f0-908a1e1a5ae6", "AQAAAAIAAYagAAAAEM0SJ8sIiTFurhEtBWDddseinF47GH4VJK6j4OJldHwcPKoHebGgISQJGUG77WVIGQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "afce86f4-954d-428e-8adf-c64b5edd2861", "AQAAAAIAAYagAAAAEC/5PzucRnSI+Una+dLmu7myp6A2puC3si0dpYbQ1vke5EUgRbUM3QEGXUbtOujVpA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e7843c5f-add8-43d6-93e2-5f01850b001b", null, "PetSitter", "PETSITTER" },
                    { "f6265090-f075-4cc0-a145-0b80c6533861", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 5, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7131));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7264), new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7262) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7272));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 6, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7277));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 11, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7311), new DateTime(2023, 10, 8, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7300) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7315));

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_DbUserId",
                table: "Jobs",
                column: "DbUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_DbUserId",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "e7843c5f-add8-43d6-93e2-5f01850b001b");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "f6265090-f075-4cc0-a145-0b80c6533861");

            migrationBuilder.RenameColumn(
                name: "DbUserId",
                table: "Jobs",
                newName: "PetSitterUserID");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_DbUserId",
                table: "Jobs",
                newName: "IX_Jobs_PetSitterUserID");

            migrationBuilder.AddColumn<int>(
                name: "Hours",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "b9484ccb-7b69-4fd2-8e1c-f4b485ac7c37", "AQAAAAIAAYagAAAAEEsfawwpVWnYjB9KMUWyvo0uNS5dp/hssQ6R7fb1W05uyYAWHE7o5pu83v2ZIXsWEg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "62ee74a2-398d-4820-920e-cc1f32bdecdd", "AQAAAAIAAYagAAAAEDCM56bsv2aGJXTqLjEj9ZAVhub/Up0rGQWbtfSJQAjDpvoPVbKyy/WL/mo1bNS01Q==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "76e6fec3-6c26-483d-9de8-7889a9ddea88", "AQAAAAIAAYagAAAAECIgD3AqlvgyKJK4SvUQbtQuXJDWrxkdwJPiaSBPzkFPomxUaIfcf8jySsRS6zrbDg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2afbbc62-5af1-4cbd-a188-c8a0c7b01bc3", "AQAAAAIAAYagAAAAEJR1U7umO8JJr05Avju1iNaxTxsOV+O4ZWqaXrRAybyhXDeWLmYRhNvlsgYfpz24fQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7a5b1fd8-f43f-4b37-9fd7-8f25a597e077", null, "PetSitter", "PETSITTER" },
                    { "a71e93b1-53d5-46cb-a03e-9ec25811c804", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Hours", "StartDate" },
                values: new object[] { 4, new DateTime(2023, 10, 4, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1381) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "Hours", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 6, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1462), 3, new DateTime(2023, 10, 6, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1459) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "Hours", "StartDate" },
                values: new object[] { 7, new DateTime(2023, 10, 6, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1469) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                columns: new[] { "Hours", "StartDate" },
                values: new object[] { 5, new DateTime(2023, 10, 5, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1475) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "Hours", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 10, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1507), 4, new DateTime(2023, 10, 7, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1494) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                columns: new[] { "Hours", "StartDate" },
                values: new object[] { 2, new DateTime(2023, 10, 6, 19, 11, 0, 837, DateTimeKind.Local).AddTicks(1511) });

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_PetSitterUserID",
                table: "Jobs",
                column: "PetSitterUserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
