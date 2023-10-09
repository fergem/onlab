using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class removedlazyloading : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "b92f7703-5a39-4381-bb88-32aaacd3a0b1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "6c43d95f-572b-4fb2-b78d-e6608ca8ee70");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "dfa265c8-b13f-4066-a3b6-6c3ba399f442");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "135158e7-b908-4c1f-9c1d-75cb411d28ca");

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 11, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7415));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 13, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7497), new DateTime(2023, 10, 13, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7495) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 13, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7507));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 12, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7514));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 17, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7522), new DateTime(2023, 10, 14, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7520) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 13, 21, 36, 42, 595, DateTimeKind.Local).AddTicks(7527));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "6ca9bf30-708f-46e2-8c29-ceca9713ae3d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "85f6abf3-3d93-41e0-80b0-f3ec8971076f");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "622dce46-d5aa-45ea-bdba-77431eb3ef14");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "8a9349ee-aacd-407d-8316-56b0d7c596e7");

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 11, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5494));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 13, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5563), new DateTime(2023, 10, 13, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5561) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 13, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5570));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 12, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5576));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 17, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5583), new DateTime(2023, 10, 14, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5582) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 13, 19, 12, 58, 538, DateTimeKind.Local).AddTicks(5587));
        }
    }
}
