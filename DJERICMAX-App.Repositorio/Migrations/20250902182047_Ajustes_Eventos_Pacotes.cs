using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class Ajustes_Eventos_Pacotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Pacote",
                table: "Eventos",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 35,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServicoId",
                table: "Eventos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_ServicoId",
                table: "Eventos",
                column: "ServicoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Eventos_Servicos_ServicoId",
                table: "Eventos",
                column: "ServicoId",
                principalTable: "Servicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Eventos_Servicos_ServicoId",
                table: "Eventos");

            migrationBuilder.DropIndex(
                name: "IX_Eventos_ServicoId",
                table: "Eventos");

            migrationBuilder.DropColumn(
                name: "ServicoId",
                table: "Eventos");

            migrationBuilder.AlterColumn<string>(
                name: "Pacote",
                table: "Eventos",
                maxLength: 35,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
