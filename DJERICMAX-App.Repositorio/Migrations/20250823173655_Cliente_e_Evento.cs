using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class Cliente_e_Evento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EventoId",
                table: "ItemPedidos",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(maxLength: 50, nullable: false),
                    SobreNome = table.Column<string>(maxLength: 50, nullable: true),
                    CPF = table.Column<string>(maxLength: 14, nullable: true),
                    RG = table.Column<string>(maxLength: 12, nullable: true),
                    Telefone = table.Column<string>(maxLength: 13, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: true),
                    Logradouro = table.Column<string>(maxLength: 50, nullable: true),
                    Num_Logradouro = table.Column<string>(maxLength: 5, nullable: true),
                    Bairro = table.Column<string>(maxLength: 50, nullable: true),
                    Cidade = table.Column<string>(maxLength: 50, nullable: false),
                    UF = table.Column<string>(maxLength: 2, nullable: false),
                    CEP = table.Column<string>(maxLength: 9, nullable: true),
                    Data_Cadastro = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Eventos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Data_Cadastro = table.Column<DateTime>(nullable: false),
                    Data_Contrato = table.Column<DateTime>(nullable: false),
                    Data_Evento = table.Column<DateTime>(nullable: false),
                    Parcelado = table.Column<bool>(nullable: false),
                    Qtde_Parcelas = table.Column<int>(nullable: false),
                    Valor_Parcelas = table.Column<int>(nullable: false),
                    ClienteId = table.Column<int>(nullable: false),
                    Logradouro_Evento = table.Column<string>(maxLength: 50, nullable: true),
                    NumeroLogradouro_Evento = table.Column<int>(maxLength: 5, nullable: false),
                    Bairro_Evento = table.Column<string>(nullable: true),
                    Cidade_Evento = table.Column<string>(maxLength: 50, nullable: true),
                    UF_Evento = table.Column<string>(maxLength: 2, nullable: true),
                    CEP_Evento = table.Column<string>(maxLength: 10, nullable: true),
                    FormaPagamentoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eventos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Eventos_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Eventos_FormaPagamento_FormaPagamentoId",
                        column: x => x.FormaPagamentoId,
                        principalTable: "FormaPagamento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemPedidos_EventoId",
                table: "ItemPedidos",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_ClienteId",
                table: "Eventos",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_FormaPagamentoId",
                table: "Eventos",
                column: "FormaPagamentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemPedidos_Eventos_EventoId",
                table: "ItemPedidos",
                column: "EventoId",
                principalTable: "Eventos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemPedidos_Eventos_EventoId",
                table: "ItemPedidos");

            migrationBuilder.DropTable(
                name: "Eventos");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropIndex(
                name: "IX_ItemPedidos_EventoId",
                table: "ItemPedidos");

            migrationBuilder.DropColumn(
                name: "EventoId",
                table: "ItemPedidos");
        }
    }
}
