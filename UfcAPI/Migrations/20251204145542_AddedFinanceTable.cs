using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UfcAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddedFinanceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Finances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MoneyLeft = table.Column<int>(type: "INTEGER", nullable: false),
                    NumberOfPurchases = table.Column<int>(type: "INTEGER", nullable: false),
                    MoneySpent = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Finances", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Finances");
        }
    }
}
