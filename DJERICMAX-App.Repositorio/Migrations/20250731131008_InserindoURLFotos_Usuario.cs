using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class InserindoURLFotos_Usuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FotoUrl",
                table: "Usuarios",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FotoUrl",
                table: "Usuarios");
        }
    }
}
