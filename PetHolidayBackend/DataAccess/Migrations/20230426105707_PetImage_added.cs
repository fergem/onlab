using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PetImage_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "83e0f3aa-df2c-4b41-a71f-689e1a2efeab");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "ed19bf3f-ae27-42ed-88c3-4c2dcea70aa7");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Pets");

            migrationBuilder.CreateTable(
                name: "PetImages",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PetID = table.Column<int>(type: "int", nullable: false),
                    Picture = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetImages", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PetImages_Pets_PetID",
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
                values: new object[] { "0957f726-f578-4057-903b-abe1b7b07a32", "AQAAAAIAAYagAAAAELRtfns6MH7JEqziEQMBxlx6XgaIYtSHrSrnrRAwhX/zGQUfyZG95vTZW4nm8PRRtg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7d3c47e8-0b1e-41c8-8db9-8c4655036cb8", "AQAAAAIAAYagAAAAEJnKAoFz9KY7fdXCpzugWXqbMnbg3k/oQc+GEqSa+QCRFJpy2Nm4X4QOfKcIm94xjA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "3d1bbf46-e982-4cbe-98a8-9b605bf4bc35", "AQAAAAIAAYagAAAAEAIkwaL7wGh1dcl50fFabf9Rd8gMDb1Q7suAhSnrPSwKYV4K0dV5O+e1cjp6qLGg7Q==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "35f03148-d991-4343-ab45-ec2fc97eb066", "AQAAAAIAAYagAAAAENhOEviW6PNsO0DFqDP/D0uZx0tIJ9/ownNr1yVc1Op54zP25GI4nUMOeGoWWXrIog==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b783dca5-03c0-46ec-9a30-f861bf48a727", null, "Owner", "OWNER" },
                    { "ed58905d-4279-414f-a24c-e9e8d3e6d8d0", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetImages_PetID",
                table: "PetImages",
                column: "PetID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetImages");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "b783dca5-03c0-46ec-9a30-f861bf48a727");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "ed58905d-4279-414f-a24c-e9e8d3e6d8d0");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Pets",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "3b390ca1-36ca-42b4-a1fe-68159bc4c87e", "AQAAAAIAAYagAAAAEO1kHCy/0J8tTBBlySFMg1qxRawv+Z5wZBHRNtKAKiISg4ASUWXe4zMCiAAZFtpp7g==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "9607b686-d350-4b0f-9e68-38c693a0bd13", "AQAAAAIAAYagAAAAEMMS1fQ12LiXfrGTK+6DqsbuRuIOrbG3tYWlPzHlASF40E8jHKnnYYofFg1l00FZzg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ef7d36a3-2775-4ee0-86f4-d4d0ccb40e9d", "AQAAAAIAAYagAAAAECCnsbWFr8p88ApKmwSbnx0wlR55/yFlfMUda6WfCU56ABG8lJaR7N6DHm8H+re/gQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "45a1f4f0-1ad1-4cb5-bf3c-c3d6e4f7334a", "AQAAAAIAAYagAAAAEANK80EjzeXUH+kOeYBAG+5Y0I+TbbGjXxdVInvrBeRkY0diHq7Psx6P6DX76BnjSg==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "83e0f3aa-df2c-4b41-a71f-689e1a2efeab", null, "Owner", "OWNER" },
                    { "ed19bf3f-ae27-42ed-88c3-4c2dcea70aa7", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 1,
                column: "Picture",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 2,
                column: "Picture",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 3,
                column: "Picture",
                value: null);
        }
    }
}
