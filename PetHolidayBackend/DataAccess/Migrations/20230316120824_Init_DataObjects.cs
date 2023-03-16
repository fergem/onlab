using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Init_DataObjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_pets",
                table: "pets");

            migrationBuilder.RenameTable(
                name: "pets",
                newName: "Pets");

            migrationBuilder.AlterColumn<string>(
                name: "Species",
                table: "Pets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Pets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Pets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Pets",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OwnerProfileID",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PetSitterProfileID",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "AspNetUsers",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pets",
                table: "Pets",
                column: "ID");

            migrationBuilder.CreateTable(
                name: "OwnerProfiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequiredExperience = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MinWage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnerProfiles", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PetSitterProfiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AcquiredExperience = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxWage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetSitterProfiles", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hours = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StatusID = table.Column<int>(type: "int", nullable: false),
                    OwnerUserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PetSitterUserID = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Jobs_AspNetUsers_OwnerUserID",
                        column: x => x.OwnerUserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Jobs_AspNetUsers_PetSitterUserID",
                        column: x => x.PetSitterUserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Jobs_Statuses_StatusID",
                        column: x => x.StatusID,
                        principalTable: "Statuses",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pets_UserID",
                table: "Pets",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_OwnerProfileID",
                table: "AspNetUsers",
                column: "OwnerProfileID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PetSitterProfileID",
                table: "AspNetUsers",
                column: "PetSitterProfileID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_OwnerUserID",
                table: "Jobs",
                column: "OwnerUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_PetSitterUserID",
                table: "Jobs",
                column: "PetSitterUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_StatusID",
                table: "Jobs",
                column: "StatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_OwnerProfiles_OwnerProfileID",
                table: "AspNetUsers",
                column: "OwnerProfileID",
                principalTable: "OwnerProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_PetSitterProfiles_PetSitterProfileID",
                table: "AspNetUsers",
                column: "PetSitterProfileID",
                principalTable: "PetSitterProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pets_AspNetUsers_UserID",
                table: "Pets",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_OwnerProfiles_OwnerProfileID",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_PetSitterProfiles_PetSitterProfileID",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Pets_AspNetUsers_UserID",
                table: "Pets");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "OwnerProfiles");

            migrationBuilder.DropTable(
                name: "PetSitterProfiles");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pets",
                table: "Pets");

            migrationBuilder.DropIndex(
                name: "IX_Pets_UserID",
                table: "Pets");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_OwnerProfileID",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PetSitterProfileID",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "OwnerProfileID",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PetSitterProfileID",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "Pets",
                newName: "pets");

            migrationBuilder.AlterColumn<string>(
                name: "Species",
                table: "pets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "pets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "pets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_pets",
                table: "pets",
                column: "ID");
        }
    }
}
