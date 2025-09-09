using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class Ajustando_Relacionamentos_de_Tabela : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_FormaPagamento_FormaPagamentoId",
                table: "Pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Usuarios_UsuarioId",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "CEP_Evento",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "CEP_Usuario",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Cidade_Evento",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Cidade_Usuario",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Data_Cadastro",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Data_Contrato",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Logradouro_Evento",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Logradouro_Usuario",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "NumeroLogradouro_Evento",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "NumeroLogradouro_Usuario",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Parcelado",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "UF_Evento",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "UF_Usuario",
                table: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "Qtde_Parcelas",
                table: "Pedidos",
                newName: "ClienteId");

            migrationBuilder.RenameColumn(
                name: "Data_Evento",
                table: "Pedidos",
                newName: "DataPedido");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Pedidos",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_ClienteId",
                table: "Pedidos",
                column: "ClienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Clientes_ClienteId",
                table: "Pedidos",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_FormaPagamento_FormaPagamentoId",
                table: "Pedidos",
                column: "FormaPagamentoId",
                principalTable: "FormaPagamento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Usuarios_UsuarioId",
                table: "Pedidos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Clientes_ClienteId",
                table: "Pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_FormaPagamento_FormaPagamentoId",
                table: "Pedidos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Usuarios_UsuarioId",
                table: "Pedidos");

            migrationBuilder.DropIndex(
                name: "IX_Pedidos_ClienteId",
                table: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "DataPedido",
                table: "Pedidos",
                newName: "Data_Evento");

            migrationBuilder.RenameColumn(
                name: "ClienteId",
                table: "Pedidos",
                newName: "Qtde_Parcelas");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Pedidos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CEP_Evento",
                table: "Pedidos",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CEP_Usuario",
                table: "Pedidos",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cidade_Evento",
                table: "Pedidos",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cidade_Usuario",
                table: "Pedidos",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Data_Cadastro",
                table: "Pedidos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Data_Contrato",
                table: "Pedidos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Logradouro_Evento",
                table: "Pedidos",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Logradouro_Usuario",
                table: "Pedidos",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumeroLogradouro_Evento",
                table: "Pedidos",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumeroLogradouro_Usuario",
                table: "Pedidos",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Parcelado",
                table: "Pedidos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UF_Evento",
                table: "Pedidos",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UF_Usuario",
                table: "Pedidos",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_FormaPagamento_FormaPagamentoId",
                table: "Pedidos",
                column: "FormaPagamentoId",
                principalTable: "FormaPagamento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Usuarios_UsuarioId",
                table: "Pedidos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
