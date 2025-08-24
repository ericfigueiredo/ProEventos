using DJERICMAX_App.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Evento : Entidade
    {
        public int Id { get; set; }
        public DateTime Data_Cadastro { get; set; }
        public DateTime Data_Contrato { get; set; }
        public DateTime Data_Evento { get; set; }
        public bool Parcelado { get; set; }
        public int Qtde_Parcelas { get; set; }
        public int Valor_Parcelas { get; set; }

        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }

        public string Logradouro_Evento { get; set; }
        public int NumeroLogradouro_Evento { get; set; }
        public string Bairro_Evento { get; set; }
        public string Cidade_Evento { get; set; }
        public string UF_Evento { get; set; }
        public string CEP_Evento { get; set; }

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
            if (string.IsNullOrEmpty(CEP_Evento))
                AdicionarCritica("Aviso: CEP do local do evento deve ser preenchido.");
            if (FormaPagamentoId == 0)
                AdicionarCritica("Aviso: Não foi identificada forma de pagamento.");
        }
    }
}
