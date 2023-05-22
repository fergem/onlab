using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Added_Job_Pet_Relationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "07832c7e-ad12-4ffa-adfd-b386ce969db3");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "59592aa5-942d-4b38-906b-a88956b5dcf9");

            migrationBuilder.CreateTable(
                name: "DbPetJob",
                columns: table => new
                {
                    JobID = table.Column<int>(type: "int", nullable: false),
                    PetID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbPetJob", x => new { x.PetID, x.JobID });
                    table.ForeignKey(
                        name: "FK_DbPetJob_Jobs_JobID",
                        column: x => x.JobID,
                        principalTable: "Jobs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DbPetJob_Pets_PetID",
                        column: x => x.PetID,
                        principalTable: "Pets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_DbPetJob_JobID",
                table: "DbPetJob",
                column: "JobID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DbPetJob");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "c2f3053d-1363-4379-a8ba-8a56c4c56bb7");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "d55d7550-01a7-4ef5-bb91-48ef30be67a2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "fe94dd41-ffc1-4ac9-87e8-164dc4d472db", "AQAAAAIAAYagAAAAEEb+o0B9+wtE+Eug9nZNRH6R+NWTVTC0tdLQ/TRs6M91YT0EenXtnTCWMq5OizZuMg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "1ab6e295-2850-4fc4-bf60-9a70cae250d2", "AQAAAAIAAYagAAAAEDaav6qjhn3WuKOTLqIWlJs02G0CxF/6QiZTEaBnPZHOb6DhbC6iAuNWX1BCHCfGhA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "64360450-53a9-456b-9989-0023fefa7596", "AQAAAAIAAYagAAAAEDqrVdWDf6yOPppfkwSA6COAY06xtX4gBVO+qdOACv3Z7qjXrCeOlK2Ak3jZdf/pYQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6ca968df-3453-41ce-a754-37cf18a8dbd6", "AQAAAAIAAYagAAAAEMthW2nCVdY70Gyp8kW34rcl4OUOUfStqRbn2kxJ8AhcS3W9BzTtPjHq4QdLWRyGVw==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "07832c7e-ad12-4ffa-adfd-b386ce969db3", null, "Owner", "OWNER" },
                    { "59592aa5-942d-4b38-906b-a88956b5dcf9", null, "PetSitter", "PETSITTER" }
                });
        }
    }
}
