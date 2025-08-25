using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DJERICMAX_App.Repositorio.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "FormaPagamento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(maxLength: 50, nullable: true),
                    Descricao = table.Column<string>(maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormaPagamento", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Servicos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(maxLength: 50, nullable: false),
                    Descricao = table.Column<string>(maxLength: 500, nullable: false),
                    Preco_Hora = table.Column<decimal>(type: "decimal(19,4)", nullable: false),
                    NomeArquivo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servicos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    Senha = table.Column<string>(maxLength: 400, nullable: false),
                    Nome = table.Column<string>(maxLength: 50, nullable: false),
                    SobreNome = table.Column<string>(maxLength: 50, nullable: false),
                    CPF = table.Column<string>(maxLength: 14, nullable: false),
                    RG = table.Column<string>(maxLength: 12, nullable: false),
                    NomeArquivo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Eventos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NomeEvento = table.Column<string>(maxLength: 50, nullable: false),
                    HoraInicio = table.Column<DateTime>(nullable: false),
                    HoraFinal = table.Column<DateTime>(nullable: false),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    DataContrato = table.Column<DateTime>(nullable: false),
                    DataEvento = table.Column<DateTime>(nullable: false),
                    Convidados = table.Column<int>(maxLength: 3, nullable: false),
                    Pacote = table.Column<string>(maxLength: 35, nullable: true),
                    Observacoes = table.Column<string>(maxLength: 600, nullable: true),
                    Parcelado = table.Column<bool>(nullable: false),
                    QtdeParcelas = table.Column<int>(maxLength: 2, nullable: false),
                    ValorParcelas = table.Column<int>(maxLength: 5, nullable: false),
                    ClienteId = table.Column<int>(nullable: false),
                    LogradouroEvento = table.Column<string>(maxLength: 50, nullable: true),
                    NumLogradouroEvento = table.Column<string>(maxLength: 5, nullable: true),
                    BairroEvento = table.Column<string>(maxLength: 30, nullable: true),
                    CidadeEvento = table.Column<string>(maxLength: 30, nullable: false),
                    UfEvento = table.Column<string>(maxLength: 2, nullable: false),
                    CepEvento = table.Column<string>(maxLength: 5, nullable: true),
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

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Data_Cadastro = table.Column<DateTime>(nullable: false),
                    Data_Contrato = table.Column<DateTime>(nullable: false),
                    Data_Evento = table.Column<DateTime>(nullable: false),
                    Parcelado = table.Column<bool>(nullable: false),
                    Qtde_Parcelas = table.Column<int>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    CEP_Usuario = table.Column<string>(maxLength: 10, nullable: true),
                    UF_Usuario = table.Column<string>(maxLength: 2, nullable: true),
                    Cidade_Usuario = table.Column<string>(maxLength: 100, nullable: true),
                    Logradouro_Usuario = table.Column<string>(maxLength: 200, nullable: true),
                    NumeroLogradouro_Usuario = table.Column<int>(maxLength: 10, nullable: false),
                    CEP_Evento = table.Column<string>(maxLength: 10, nullable: true),
                    UF_Evento = table.Column<string>(maxLength: 2, nullable: true),
                    Cidade_Evento = table.Column<string>(maxLength: 100, nullable: true),
                    Logradouro_Evento = table.Column<string>(maxLength: 200, nullable: true),
                    NumeroLogradouro_Evento = table.Column<int>(maxLength: 10, nullable: false),
                    FormaPagamentoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pedidos_FormaPagamento_FormaPagamentoId",
                        column: x => x.FormaPagamentoId,
                        principalTable: "FormaPagamento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pedidos_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemPedidos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServicoId = table.Column<int>(maxLength: 9, nullable: false),
                    Quantidade_Horas = table.Column<int>(maxLength: 2, nullable: false),
                    EventoId = table.Column<int>(nullable: true),
                    PedidoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemPedidos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemPedidos_Eventos_EventoId",
                        column: x => x.EventoId,
                        principalTable: "Eventos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ItemPedidos_Pedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "Pedidos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "FormaPagamento",
                columns: new[] { "Id", "Descricao", "Nome" },
                values: new object[,]
                {
                    { 1, "Forma de pagamento é Boleto", "Boleto" },
                    { 2, "Forma de pagamento é Cartão de Crédito", "Cartão de Crédito" },
                    { 3, "Forma de pagamento é Depósito", "Depósito" },
                    { 4, "Forma de pagamento é Pix", "Pix" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_ClienteId",
                table: "Eventos",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_FormaPagamentoId",
                table: "Eventos",
                column: "FormaPagamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPedidos_EventoId",
                table: "ItemPedidos",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemPedidos_PedidoId",
                table: "ItemPedidos",
                column: "PedidoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_FormaPagamentoId",
                table: "Pedidos",
                column: "FormaPagamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_UsuarioId",
                table: "Pedidos",
                column: "UsuarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemPedidos");

            migrationBuilder.DropTable(
                name: "Servicos");

            migrationBuilder.DropTable(
                name: "Eventos");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "FormaPagamento");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
