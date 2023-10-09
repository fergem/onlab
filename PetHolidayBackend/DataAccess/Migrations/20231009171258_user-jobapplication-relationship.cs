using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class userjobapplicationrelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_UserId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_UserId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Jobs");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "884aae4e-197f-4417-849a-b091409a9750");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "1a126382-5d76-450b-8e8a-f71c6ad35fc2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "9fe3d616-50e9-4afc-b1bb-ab135c61d878");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "ab716eac-5600-4f93-b27d-a7ebd3b50072");

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "StartDate", "UserId" },
                values: new object[] { new DateTime(2023, 10, 10, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(912), null });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate", "UserId" },
                values: new object[] { new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(989), new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(986), null });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "StartDate", "UserId" },
                values: new object[] { new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(997), null });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                columns: new[] { "StartDate", "UserId" },
                values: new object[] { new DateTime(2023, 10, 11, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1004), null });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate", "UserId" },
                values: new object[] { new DateTime(2023, 10, 16, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1012), new DateTime(2023, 10, 13, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1010), null });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                columns: new[] { "StartDate", "UserId" },
                values: new object[] { new DateTime(2023, 10, 12, 21, 37, 44, 856, DateTimeKind.Local).AddTicks(1018), null });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_UserId",
                table: "Jobs",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_UserId",
                table: "Jobs",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
