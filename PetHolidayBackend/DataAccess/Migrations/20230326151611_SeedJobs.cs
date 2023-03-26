using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SeedJobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Statuses_StatusID",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0ad6386c-1849-48c4-99ce-1ab7b956fe55");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "68054422-3439-4cef-8ed6-b081067cc8e2");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "db3c6156-f4cc-44da-b187-fe128413b896");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e864c390-95a4-435c-b34b-3349b6a261f7");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Jobs");

            migrationBuilder.AlterColumn<int>(
                name: "StatusID",
                table: "Jobs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Jobs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Jobs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Age", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Picture", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "1c852612-404d-4247-ad60-423ba3f53d97", 0, 17, "42ed9234-8f33-4a48-bac7-d437034809db", null, false, "Maku", "Látlan", false, null, null, null, null, null, false, null, "6f1d4ad5-39d4-475a-8049-15415dec4561", false, "makulatlan" },
                    { "6698ff56-328e-4143-8390-b70ddd753202", 0, 43, "c72dfad5-41d1-4db7-b77a-6df251fd129f", null, false, "Vicc", "Elek", false, null, null, null, null, null, false, null, "d895d4c6-9e62-40db-ba0d-81d3554b32c7", false, "viccelek" },
                    { "73026e88-ffbd-4b28-84bd-587aa80fad36", 0, 23, "ab6288df-b0a6-4cdc-9504-1209d8e1e262", null, false, "Kiss", "Janos", false, null, null, null, null, null, false, null, "426fac57-1a52-4501-b586-946cbb018747", false, "kissjanos" },
                    { "fb5244c3-899b-46a3-b7ce-0f89cd35c865", 0, 32, "ae6e5c05-66b9-477e-9990-33374000872a", null, false, "Nagy", "Feró", false, null, null, null, null, null, false, null, "77083d05-c3ba-43ff-8d84-edc687300d55", false, "nagyfero" }
                });

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "ID", "Description", "Hours", "Location", "OwnerUserID", "PetSitterUserID", "StatusID" },
                values: new object[,]
                {
                    { 1, "Kutyára kell vigyázni", 4, "Szeged", null, null, null },
                    { 2, "Cicára kell vigyázni", 3, "Szolnok", null, null, null },
                    { 3, "Teknőcre kell vigyázni", 7, "Jászkarajenő", null, null, null }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Statuses_StatusID",
                table: "Jobs",
                column: "StatusID",
                principalTable: "Statuses",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Statuses_StatusID",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1c852612-404d-4247-ad60-423ba3f53d97");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6698ff56-328e-4143-8390-b70ddd753202");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "73026e88-ffbd-4b28-84bd-587aa80fad36");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fb5244c3-899b-46a3-b7ce-0f89cd35c865");

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Jobs");

            migrationBuilder.AlterColumn<int>(
                name: "StatusID",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Jobs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Jobs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Age", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Picture", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "0ad6386c-1849-48c4-99ce-1ab7b956fe55", 0, 23, "87cde174-ef38-49cb-bcec-18b85f2af6f6", null, false, "Kiss", "Janos", false, null, null, null, null, null, false, null, "a3103e27-45ab-4e02-94ac-4b0c958f925d", false, "kissjanos" },
                    { "68054422-3439-4cef-8ed6-b081067cc8e2", 0, 17, "8b0fcf0e-adad-4fa1-a172-4699ad8a208e", null, false, "Maku", "Látlan", false, null, null, null, null, null, false, null, "8bcf2586-8f56-4c75-92ff-0c871334b7ca", false, "makulatlan" },
                    { "db3c6156-f4cc-44da-b187-fe128413b896", 0, 32, "9d035110-ebb9-480b-89cd-4ce59183db58", null, false, "Nagy", "Feró", false, null, null, null, null, null, false, null, "b86cf490-ec80-447f-86d4-1bf473a3ef03", false, "nagyfero" },
                    { "e864c390-95a4-435c-b34b-3349b6a261f7", 0, 43, "fd7c2ee9-6fd3-4139-8eab-5cebf8f733dc", null, false, "Vicc", "Elek", false, null, null, null, null, null, false, null, "f75ca1d3-1ca9-4055-afd2-ac08fab966a7", false, "viccelek" }
                });

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
