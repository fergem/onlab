using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Cleanse_Project : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "e7843c5f-add8-43d6-93e2-5f01850b001b");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "f6265090-f075-4cc0-a145-0b80c6533861");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Pets");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5d36dc0a-f317-431a-addc-faac9cb95477", "AQAAAAIAAYagAAAAEO3pA1pR6Qm+rt/jjBC1NUOLShZatoHSUy121t2LkEIX0ONKFGInRbsMFUwQanHGMA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "63d8ad08-0b77-425a-ad08-fc1514b874d9", "AQAAAAIAAYagAAAAEKMDgAvldC7WF+xD1vv2wYyoz2Oa5kFGFRQLG+9wYdbonB9Fqu9Ru8fU6wQkMoJCeA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d7219369-f175-488d-93a4-a61fb189dc08", "AQAAAAIAAYagAAAAEHGRsCDNM4ziqqFB9L2ftOIxM+u0HEh96U+bmvLcA6qkrpyOmhyYt8nYOjHo9abGww==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f72a791e-a89e-45e3-8fce-1eccf61af1fb", "AQAAAAIAAYagAAAAEPUx0wYlgoLa+N/ADOjg6irmfV31d9v+v3+Mc4AxEUOD6oFjwm6JK/Cj4x9v1bovkw==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "40845835-59fd-4b65-ba74-6c5e600c26ec", null, "Owner", "OWNER" },
                    { "f907408a-24fe-4af6-a951-e4ba133014f4", null, "PetSitter", "PETSITTER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 6, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6031));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 8, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6203), new DateTime(2023, 10, 8, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6199) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 8, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6214));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 7, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6220));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 12, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6265), new DateTime(2023, 10, 9, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6251) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 8, 22, 27, 19, 385, DateTimeKind.Local).AddTicks(6270));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "40845835-59fd-4b65-ba74-6c5e600c26ec");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "f907408a-24fe-4af6-a951-e4ba133014f4");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Pets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0872bdf9-c98b-4513-abb1-b94d14e97d28", "AQAAAAIAAYagAAAAEPSKOiPa0WkJlEtHeAx6zvRoJ+j39aEZoEcbDD5dwSl2OTJHPyNaxx/9wTc3ftK1XQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d8e6de18-2920-4ed2-a6c9-8539a8eee5a9", "AQAAAAIAAYagAAAAEGQcNtq+I9n+DAc0cAcRgnzKchzLHLVDmz13YY/I6F+DPnPR40SVFopBpXu+azbqFg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "719c1078-6f0e-47df-84f0-908a1e1a5ae6", "AQAAAAIAAYagAAAAEM0SJ8sIiTFurhEtBWDddseinF47GH4VJK6j4OJldHwcPKoHebGgISQJGUG77WVIGQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "afce86f4-954d-428e-8adf-c64b5edd2861", "AQAAAAIAAYagAAAAEC/5PzucRnSI+Una+dLmu7myp6A2puC3si0dpYbQ1vke5EUgRbUM3QEGXUbtOujVpA==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e7843c5f-add8-43d6-93e2-5f01850b001b", null, "PetSitter", "PETSITTER" },
                    { "f6265090-f075-4cc0-a145-0b80c6533861", null, "Owner", "OWNER" }
                });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 1,
                column: "StartDate",
                value: new DateTime(2023, 10, 5, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7131));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7264), new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7262) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 3,
                column: "StartDate",
                value: new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7272));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 4,
                column: "StartDate",
                value: new DateTime(2023, 10, 6, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7277));

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2023, 10, 11, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7311), new DateTime(2023, 10, 8, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7300) });

            migrationBuilder.UpdateData(
                table: "Jobs",
                keyColumn: "ID",
                keyValue: 6,
                column: "StartDate",
                value: new DateTime(2023, 10, 7, 20, 26, 13, 850, DateTimeKind.Local).AddTicks(7315));

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 1,
                column: "Description",
                value: "Milio, the seven-year-old dog, boasts a heartwarming mix of wisdom and playfulness, his tail wagging through years of cherished adventures and companionship. His loyal eyes and graying fur tell a tale of unwavering friendship and boundless joy.");

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 2,
                column: "Description",
                value: "Randy, the three-year-old cat, exudes youthful energy and curiosity in every graceful leap and stealthy pounce. With his sleek coat and bright, inquisitive eyes, he's a charming feline companion who brings a sense of enchantment to each day.");

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 3,
                column: "Description",
                value: "Luna, the two-year-old pup, radiates youthful exuberance, bringing endless energy and an infectious spirit to every moment. With her vibrant personality and sparkling eyes, she's a delightful and energetic companion for any adventure.");

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 4,
                column: "Description",
                value: "Whiskers, the three-year-old cat, exudes a graceful charm and inquisitive nature. With a glossy fur coat and sparkling eyes, Whiskers is a delightful feline companion who adds a touch of enchantment to every day.");

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 5,
                column: "Description",
                value: "Rusty, the four-year-old dog, emanates loyalty and playful energy. With a warm, russet-colored coat and soulful eyes, Rusty is a cherished canine companion who brings joy and adventure to each day.");

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 6,
                column: "Description",
                value: "Max, the energetic four-year-old Labrador, radiates boundless enthusiasm and a love for play. With a sleek, chocolate-colored coat and an ever-wagging tail, Max is a cherished canine companion who brings joy and adventure to every moment.");

            migrationBuilder.UpdateData(
                table: "Pets",
                keyColumn: "ID",
                keyValue: 7,
                column: "Description",
                value: "Bella, the vivacious four-year-old Labrador, exudes charm and a zest for life. With a shiny, golden coat and bright, sparkling eyes, Bella is a beloved canine companion who adds a touch of sunshine to every day.");
        }
    }
}
