using DJERICMAX_App.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Evento : Entidade
    {
        public int Id { get; set; }
        public string NomeEvento { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFinal { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime DataContrato { get; set; }
        public DateTime DataEvento { get; set; }
        public int Convidados { get; set; }
        public string Pacote { get; set; }
        public string Observacoes { get; set; }
        public bool Parcelado { get; set; }
        public int QtdeParcelas { get; set; }
        public int ValorParcelas { get; set; }

        public string LogradouroEvento { get; set; }
        public string NumLogradouroEvento { get; set; }
        public string BairroEvento { get; set; }
        public string CidadeEvento { get; set; }
        public string UfEvento { get; set; }
        public string CepEvento { get; set; }

        public bool Proposta { get; set; }
        public bool Fechado { get; set; }
        public bool Realizado { get; set; }
        public bool Cancelado { get; set; }

        // Relações
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }

        public int FormaPagamentoId { get; set; }
        public virtual FormaPagamento FormaPagamento { get; set; }

        public virtual ICollection<ItemPedido> ItensPedido { get; set; }
        public virtual ICollection<Parcela> Parcelas { get; set; } = new List<Parcela>();

        // Propriedade calculada para valor total
        public decimal ValorTotal => ItensPedido?.Sum(ip => ip.ValorTotal) ?? 0;

        public void GerarParcelas()
        {
             if (Parcelas.Any())
            {
                foreach (var parcela in Parcelas)
                {
                    if (parcela.Pago)
                    {
                        parcela.Pago = parcela.Pago;
                        //parcela.DataVencimento = parcela.DataVencimento.Date; // exemplo
                    }
                }
            }
            else
            {
                Parcelas.Clear();
                // ========================
                // NÃO DEFINIDO
                // ========================
                if (FormaPagamentoId == 0)
                    return;

                // ========================
                // BOLETO OU DEPÓSITO
                // ========================
                if (FormaPagamentoId == 1 || FormaPagamentoId == 3)
                {
                    Parcelas.Add(new Parcela
                    {
                        Numero = 1,
                        Valor = ValorTotal,
                        DataVencimento = DataContrato, // ou outro campo, se preferir
                        Pago = false
                    });

                    QtdeParcelas = 1;
                    ValorParcelas = (int)ValorTotal;
                    return;
                }

                // ========================
                // CARTÃO DE CRÉDITO
                // ========================
                if (FormaPagamentoId == 2)
                {
                    if (QtdeParcelas < 1) QtdeParcelas = 1;

                    decimal valorParcela = Math.Round(ValorTotal / QtdeParcelas, 2);

                    for (int i = 0; i < QtdeParcelas; i++)
                    {
                        DateTime vencimento = DataContrato.AddMonths(i); // mensal
                        Parcelas.Add(new Parcela
                        {
                            Numero = i + 1,
                            Valor = valorParcela,
                            DataVencimento = vencimento,
                            Pago = false
                        });
                    }

                    ValorParcelas = (int)valorParcela;
                    return;
                }

                // ========================
                // PAGAMENTO COM ENTRADA (ID = 4) - PIX
                // ========================
                if (FormaPagamentoId == 4)
                {
                    // Entrada (30%)
                    decimal entrada = Math.Round(ValorTotal * 0.30m, 2);
                    Parcelas.Add(new Parcela
                    {
                        Numero = 1,
                        Valor = entrada,
                        DataVencimento = DataContrato,
                        Pago = true
                    });

                    // Restante do valor
                    decimal restante = ValorTotal - entrada;

                    // Garantir que há pelo menos 1 parcela para o restante
                    if (QtdeParcelas < 1) QtdeParcelas = 1;

                    // Calcular valor da parcela
                    decimal valorParcela = Math.Round(restante / QtdeParcelas, 2);

                    // Ajustar possíveis diferenças de centavos na última parcela
                    decimal somaParcelas = valorParcela * (QtdeParcelas - 1);
                    decimal ultimaParcela = restante - somaParcelas;

                    // Data limite: 5 dias antes do evento
                    DateTime dataLimite = DataEvento.AddDays(-5);

                    for (int i = 0; i < QtdeParcelas; i++)
                    {
                        DateTime dataVencimento;

                        // Calcular a data base (30 dias após a parcela anterior)
                        DateTime dataBase = DataContrato.AddMonths(i + 1);

                        if (i == QtdeParcelas - 1)
                        {
                            // Última parcela: usar a menor data entre (30 dias após anterior) e (5 dias antes do evento)
                            dataVencimento = dataBase < dataLimite ? dataBase : dataLimite;
                        }
                        else
                        {
                            // Parcelas normais: 30 dias após a anterior
                            dataVencimento = dataBase;

                            // Verificar se não ultrapassa o limite (caso de muitas parcelas)
                            if (dataVencimento > dataLimite)
                                dataVencimento = dataLimite;
                        }

                        // Valor da parcela (ajustar última parcela para evitar diferenças de centavos)
                        decimal valor = (i == QtdeParcelas - 1) ? ultimaParcela : valorParcela;

                        Parcelas.Add(new Parcela
                        {
                            Numero = i + 2, // +2 porque a entrada é a parcela 1
                            Valor = Math.Round(valor, 2),
                            DataVencimento = dataVencimento,
                            Pago = false
                        });
                    }

                    ValorParcelas = (int)valorParcela;
                    return;
                }
            }
        }



        public override void Validate()
        {
            LimparMensagensValidacao();
            if (!ItensPedido.Any())
                AdicionarCritica("Aviso: Eventos não podem ser cadastrados sem itens de serviços.");
            if (string.IsNullOrEmpty(NomeEvento))
                AdicionarCritica("Aviso: Nome do Evento deve ser preenchido.");
            if (DataEvento == DateTime.MinValue)
                AdicionarCritica("Aviso: Data do Evento deve ser preenchido.");
            if (string.IsNullOrEmpty(CidadeEvento))
                AdicionarCritica("Aviso: Cidade do Evento deve ser preenchido.");
            if (string.IsNullOrEmpty(UfEvento))
                AdicionarCritica("Aviso: UF do Evento deve ser preenchido.");
            if (FormaPagamentoId == 0)
                AdicionarCritica("Aviso: Não foi identificada forma de pagamento.");
        }
    }
}
