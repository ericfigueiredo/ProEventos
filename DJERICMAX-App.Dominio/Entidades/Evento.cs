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
        public bool Parcelado{ get; set; }
        public int QtdeParcelas { get; set; }
        public int ValorParcelas { get; set; }

        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }

        public string LogradouroEvento { get; set; }
        public string NumLogradouroEvento { get; set; }
        public string BairroEvento { get; set; }
        public string CidadeEvento { get; set; }
        public string UfEvento { get; set; }
        public string CepEvento { get; set; }

        public int FormaPagamentoId { get; set; }
        public virtual FormaPagamento FormaPagamento { get; set; }

        /// <summary>
        /// Pedido deve ter pelo menos um item de pedido
        /// ou muitos itens de pedidos
        /// </summary>
        public virtual ICollection<ItemPedido> ItensPedido { get; set; }

        public override void Validate()
        {
            LimparMensagensValidacao();
            if (!ItensPedido.Any())
                AdicionarCritica("Aviso: Eventos não podem ser cadastrados sem itens de serviços.");
            if (string.IsNullOrEmpty(NomeEvento))
                AdicionarCritica("Aviso: Nome do Evento deve ser preenchido.");
            if (string.IsNullOrEmpty(DataEvento.ToString()))
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
