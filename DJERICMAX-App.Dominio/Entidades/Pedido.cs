using DJERICMAX_App.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }
        public DateTime Data_Cadastro { get; set; }
        public DateTime Data_Contrato { get; set; }
        public DateTime Data_Evento { get; set; }
        public bool Parcelado { get; set; }
        public int Qtde_Parcelas { get; set; }

        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public string CEP_Usuario { get; set; }
        public string UF_Usuario { get; set; }
        public string Cidade_Usuario { get; set; }
        public string Logradouro_Usuario { get; set; }
        public int NumeroLogradouro_Usuario { get; set; }
        public string CEP_Evento { get; set; }
        public string UF_Evento { get; set; }
        public string Cidade_Evento { get; set; }
        public string Logradouro_Evento { get; set; }
        public int NumeroLogradouro_Evento { get; set; }

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
                AdicionarCritica("Aviso: Pedidos não podem ser cadastrados sem itens.");
            if (string.IsNullOrEmpty(CEP_Usuario))
                AdicionarCritica("Aviso: CEP de usuário deve ser preenchido.");
            if (string.IsNullOrEmpty(CEP_Evento))
                AdicionarCritica("Aviso: CEP do local do evento deve ser preenchido.");
            if (FormaPagamentoId == 0)
                AdicionarCritica("Aviso: Não foi identificada forma de pagamento.");
        }
    }
}
