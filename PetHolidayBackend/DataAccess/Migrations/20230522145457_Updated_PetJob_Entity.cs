using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Updated_PetJob_Entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DbPetJob_Jobs_JobID",
                table: "DbPetJob");

            migrationBuilder.DropForeignKey(
                name: "FK_DbPetJob_Pets_PetID",
                table: "DbPetJob");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DbPetJob",
                table: "DbPetJob");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c2f3053d-1363-4379-a8ba-8a56c4c56bb7");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "d55d7550-01a7-4ef5-bb91-48ef30be67a2");

            migrationBuilder.RenameTable(
                name: "DbPetJob",
                newName: "PetJob");

            migrationBuilder.RenameIndex(
                name: "IX_DbPetJob_JobID",
                table: "PetJob",
                newName: "IX_PetJob_JobID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PetJob",
                table: "PetJob",
                columns: new[] { "PetID", "JobID" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7705293c-496b-4164-ab66-41ca32a460a9", "AQAAAAIAAYagAAAAEMNYOhWsMZeOPAP3Dqd3wq5K3xKb9AM6EYEN0F1esYdtAbeWfpUe6dU63+TpcR73WQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ecec3f50-09ee-4432-b1d1-adc9fb034331", "AQAAAAIAAYagAAAAEBF+TyYNlW/No89gburoR3EEjTY/sRZC9RXamRxC5GUG/2a0lsKxhJ8xA+PADXQonw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "b3d29971-5c0e-403a-a65f-f0d10da2d5fd", "AQAAAAIAAYagAAAAEEWj8oRCQQp9sIAGVUbS6ziWpLiHCRWPPfLcJ0hgm7SJNMjOq7RWftGxhzeZGJAYCw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "135f9a1f-4e54-4b3e-9062-f061951dbd8e", "AQAAAAIAAYagAAAAEHQJbgRUqzjNyOKnTho1rFIp9d1CkUgEXNPyzt41zPNb7RPjarTJ23iwuEUBHt0LwQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "cd269255-4c32-4a40-9a4f-0e853e72ef0b", null, "PetSitter", "PETSITTER" },
                    { "f71a302f-0d35-4a71-9d62-d2045db2dec6", null, "Owner", "OWNER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_PetJob_Jobs_JobID",
                table: "PetJob",
                column: "JobID",
                principalTable: "Jobs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PetJob_Pets_PetID",
                table: "PetJob",
                column: "PetID",
                principalTable: "Pets",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetJob_Jobs_JobID",
                table: "PetJob");

            migrationBuilder.DropForeignKey(
                name: "FK_PetJob_Pets_PetID",
                table: "PetJob");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PetJob",
                table: "PetJob");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "cd269255-4c32-4a40-9a4f-0e853e72ef0b");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "f71a302f-0d35-4a71-9d62-d2045db2dec6");

            migrationBuilder.RenameTable(
                name: "PetJob",
                newName: "DbPetJob");

            migrationBuilder.RenameIndex(
                name: "IX_PetJob_JobID",
                table: "DbPetJob",
                newName: "IX_DbPetJob_JobID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DbPetJob",
                table: "DbPetJob",
                columns: new[] { "PetID", "JobID" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e9b17747-3de4-4777-815b-5fd43ec62533", "AQAAAAIAAYagAAAAENIAlQlGuElMXp/tRclo7RE0VqPPVQMwX93w15q+DdC+/+vUyONtRhB9Q1l6g8/+Dw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "4c5e2ecf-0f70-4f77-864e-935a66d3115e", "AQAAAAIAAYagAAAAEFqIUmX4vxtnopn4F3uhzgVu6iC4m8yQmLO7tjc38CuxM0kfCl/y8U8xNNDEo4PsSw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2937565f-2a6d-4d99-b41a-dc7bb540fac8", "AQAAAAIAAYagAAAAEFFiF25UDgDhORMAaaHTGOs4PPYp0ZO61ztWLBbPo16BDGk0VX5PLHk6m+LbWzroiA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7e10a02f-e80d-40bd-84aa-8651e71df23e", "AQAAAAIAAYagAAAAEC5IL/u1wd8FcXryl5yoBCQubnWntSZk+OiNf8jUiYTHljOt8uas1clgyePsQFyw+A==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c2f3053d-1363-4379-a8ba-8a56c4c56bb7", null, "PetSitter", "PETSITTER" },
                    { "d55d7550-01a7-4ef5-bb91-48ef30be67a2", null, "Owner", "OWNER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_DbPetJob_Jobs_JobID",
                table: "DbPetJob",
                column: "JobID",
                principalTable: "Jobs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DbPetJob_Pets_PetID",
                table: "DbPetJob",
                column: "PetID",
                principalTable: "Pets",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
