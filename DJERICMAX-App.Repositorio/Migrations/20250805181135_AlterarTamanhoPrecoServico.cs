using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class AlterarTamanhoPrecoServico : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Preco_Hora",
                table: "Servicos",
                type: "decimal(19,4)",
                nullable: false,
                oldClrType: typeof(decimal));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Preco_Hora",
                table: "Servicos",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(19,4)");
        }
    }
}
