using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Auto_Include_Pet_Image : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "03e6b264-87a1-4021-a294-ca4ba4d4e83d");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "76619453-81cd-41a5-af0c-76c9ca5784f8");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "60fd77e6-fa7a-43c9-88aa-6b2f056e5aac", "AQAAAAIAAYagAAAAECoMVGL/Y4VIwNLIAjfc2M7XLf1JWxR1X74BzpZD/8mdO//yYNzhWWu4oSrYyxj1xg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "dad9b7f3-6264-4f00-b00a-ed8e62369101", "AQAAAAIAAYagAAAAEOlMl5Jg3IRHvEym1moD2TJKLsoEfpeXYrPTxoFeEHfWp19w3YcgFnE27m+Wx91UUA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a2d079d9-83fd-4a7d-9e6d-48322592fd70", "AQAAAAIAAYagAAAAEM52w5N60xlEVtI4OHSYXorTYBsJCFQiqXHIC+BRsSxlnWG89+R+L8OwxTbiwSe85g==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "52d5ce85-6682-4e27-83c2-02c0c24a615d", "AQAAAAIAAYagAAAAEPbhrBE+viUOC5rIW5j7xwUO9m9EW0uD/NBfap2pJu4qi5W9BU+d0+CJNiP0iarGZQ==" });

            migrationBuilder.InsertData(
                table: "IdentityRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "793b4cd5-81e5-4146-8f08-a3581bc15b77", null, "PetSitter", "PETSITTER" },
                    { "f89e1144-a867-4741-bb55-00c78038d7c4", null, "Owner", "OWNER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "793b4cd5-81e5-4146-8f08-a3581bc15b77");

            migrationBuilder.DeleteData(
                table: "IdentityRole",
                keyColumn: "Id",
                keyValue: "f89e1144-a867-4741-bb55-00c78038d7c4");

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
        }
    }
}
