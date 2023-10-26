using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class added_status_to_application : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "JobApplications");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "JobApplications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "c8c3c0f1-ab04-40cf-a1a4-696a8cf97aaf");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "0a226271-e0ef-4ee9-852f-482fae33e1e2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "dbe62fb7-8a42-4555-a636-a482911df59c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "f1315cc3-9404-4461-bf80-650b675a72c6");

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 28, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3866));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 30, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3932), new DateTime(2023, 10, 30, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3930) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 30, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3938));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 29, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3944));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 11, 3, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3950), new DateTime(2023, 10, 31, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3949) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 30, 19, 43, 28, 442, DateTimeKind.Local).AddTicks(3954));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "JobApplications");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "JobApplications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "8c462819-39ad-49bb-87ae-1a36767263f0");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "bd8cb9a7-3719-4011-86cd-eed51f5ac481");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "f8cc3f23-6bbc-4969-823c-d48dbd8dbf14");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "8977a56f-b208-48ec-9bac-d364753e0de8");

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 22, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2279));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 24, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2343), new DateTime(2023, 10, 24, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2341) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 24, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2350));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 23, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2356));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 28, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2363), new DateTime(2023, 10, 25, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2361) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 24, 15, 14, 6, 903, DateTimeKind.Local).AddTicks(2367));
        }
    }
}
