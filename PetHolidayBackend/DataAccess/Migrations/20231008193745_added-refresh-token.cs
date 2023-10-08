using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addedrefreshtoken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Bearer",
                table: "AspNetUsers",
                newName: "RefreshToken");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpiryTime",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "RefreshTokenExpiryTime" },
                values: new object[] { "884aae4e-197f-4417-849a-b091409a9750", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "RefreshTokenExpiryTime" },
                values: new object[] { "1a126382-5d76-450b-8e8a-f71c6ad35fc2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "RefreshTokenExpiryTime" },
                values: new object[] { "9fe3d616-50e9-4afc-b1bb-ab135c61d878", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "RefreshTokenExpiryTime" },
                values: new object[] { "ab716eac-5600-4f93-b27d-a7ebd3b50072", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 10, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(912));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(989), new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(986) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(997));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 11, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1004));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 16, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1012), new DateTime(2023, 10, 13, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1010) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1018));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefreshTokenExpiryTime",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "AspNetUsers",
                newName: "Bearer");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "46b25d6e-2fe8-4cde-87fa-7a57fcdd8ca9");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "acd4c8ff-9a27-4292-9bf8-e77cdbee8dc2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "f70288a6-ff26-4043-938f-f7a1022b9ef6");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "4f367ed8-eec1-4ee5-af0b-a29cff91a78f");

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 9, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(7871));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 11, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(7937), new DateTime(2023, 10, 11, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(7935) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 11, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(7945));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 10, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(8000));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 15, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(8006), new DateTime(2023, 10, 12, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(8005) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 11, 15, 20, 0, 268, DateTimeKind.Local).AddTicks(8010));
        }
    }
}
