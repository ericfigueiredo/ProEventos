using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class CargaFormaPagamento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "FormaPagamento",
                columns: new[] { "Id", "Descricao", "Nome" },
                values: new object[,]
                {
                    { 1, "Forma de pagamento é Boleto", "Boleto" },
                    { 2, "Forma de pagamento é Cartão de Crédito", "Cartão de Crédito" },
                    { 3, "Forma de pagamento é Débito", "Débito" },
                    { 4, "Forma de pagamento é Pix", "Pix" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "FormaPagamento",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FormaPagamento",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FormaPagamento",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "FormaPagamento",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
