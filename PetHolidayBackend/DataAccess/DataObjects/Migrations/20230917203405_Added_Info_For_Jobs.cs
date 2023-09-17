using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Added_Info_For_Jobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Statuses_StatusID",
                table: "Jobs");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_StatusID",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "03e6b264-87a1-4021-a294-ca4ba4d4e83d");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "76619453-81cd-41a5-af0c-76c9ca5784f8");

            migrationBuilder.RenameColumn(
                name: "StatusID",
                table: "Jobs",
                newName: "Status");

            migrationBuilder.AddColumn<string>(
                name: "Days",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Jobs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Repeated",
                table: "Jobs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Jobs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "127aaa48-53e1-45a5-b0f9-6c92ff649828", "AQAAAAIAAYagAAAAEPtsV/Ai0XsSFgo/109FC6ro04iHaG8uCQvKmhdMlcNIcI4s0dGgQtZ/7dpI/DFZlA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "affb714e-5c8a-4e0b-8189-9e51c5609707", "AQAAAAIAAYagAAAAEFhD/MD2MubUgoinmNVrzXIMfLsmiAa8PSWUkBZY2KrNF6a3gp3qEfP59KNGRWMJ+Q==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "cd14dbbc-6755-4a87-839c-af4af0d1294b", "AQAAAAIAAYagAAAAEOgPx4EGQ24ganOQVCNwBCaiNKLdvKyx9bcjYpz4+wdFZC7mKQ0junvDvhAeZyhv+w==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "32dd683e-c65b-4f09-8f6d-0a0451826296", "AQAAAAIAAYagAAAAEABn+48qD1Jo5KKCXyTGon0Wq2NJrqq36+QlHp7S8lFZHoU13YMKmp1fEQ4LEXwzjg==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3589a754-952c-46f4-b874-ae22171fffa8", null, "PetSitter", "PETSITTER" },
                    { "c2881fa1-ce19-4eb5-9e6a-c4063585fb12", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Days", "EndDate", "Repeated", "StartDate" },
                values: new object[] { null, new DateTime(2023, 9, 21, 22, 34, 5, 351, DateTimeKind.Local).AddTicks(1178), true, new DateTime(2023, 9, 19, 22, 34, 5, 351, DateTimeKind.Local).AddTicks(1117) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Days", "EndDate", "Repeated", "StartDate" },
                values: new object[] { null, null, false, new DateTime(2023, 9, 21, 22, 34, 5, 351, DateTimeKind.Local).AddTicks(1185) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "Days", "EndDate", "Repeated", "StartDate" },
                values: new object[] { null, null, false, new DateTime(2023, 9, 20, 22, 34, 5, 351, DateTimeKind.Local).AddTicks(1188) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "3589a754-952c-46f4-b874-ae22171fffa8");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c2881fa1-ce19-4eb5-9e6a-c4063585fb12");

            migrationBuilder.DropColumn(
                name: "Days",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Repeated",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Jobs",
                newName: "StatusID");

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.ID);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2f718039-505c-401d-b321-173cdc2661ae", "AQAAAAIAAYagAAAAED9ai2k1fdUXp/8OoLE6GSr8szBsriZUFWf9hHSdLJ3tqHEZMRH9n2hvVYw5ddJ6AQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "747c99cb-fc13-4274-8be0-b2189506aaa5", "AQAAAAIAAYagAAAAEHvr3MTqRmjXnK376FpxbDyDj9LY4yWWlhlpgWNld0npVdntGJ01LlrGsiSLaUM5rA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "efb87f48-b5f6-4b32-941a-29892815b46c", "AQAAAAIAAYagAAAAEHkbqatC5mlq8P7PFLPSsMIrT5FfSC30MdakSnTpg/xX7aiMuBXDx9OTby2o89uxWw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "64984df1-ca6f-4d2b-97a9-b44941fbe000", "AQAAAAIAAYagAAAAEHTgs+hWRFwist2xeco7xk7q2L83RWTeSTLeyBXQB9bQNGbARVl/kjnVHIpN2GYAxA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "03e6b264-87a1-4021-a294-ca4ba4d4e83d", null, "PetSitter", "PETSITTER" },
                    { "76619453-81cd-41a5-af0c-76c9ca5784f8", null, "Owner", "OWNER" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "ID", "Name" },
                values: new object[,]
                {
                    { 1, "Available" },
                    { 2, "WaitingForApproval" },
                    { 3, "Inprogress" },
                    { 4, "Done" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_StatusID",
                table: "Jobs",
                column: "StatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Statuses_StatusID",
                table: "Jobs",
                column: "StatusID",
                principalTable: "Statuses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
