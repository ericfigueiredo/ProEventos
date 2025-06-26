using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class CargaFormaPagamento2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "FormaPagamento",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Descricao", "Nome" },
                values: new object[] { "Forma de pagamento é Depósito", "Depósito" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "FormaPagamento",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Descricao", "Nome" },
                values: new object[] { "Forma de pagamento é Débito", "Débito" });
        }
    }
}
