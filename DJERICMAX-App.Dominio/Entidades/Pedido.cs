using DJERICMAX_App.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }
        public int FormaPagamentoId { get; set; }
        public virtual FormaPagamento FormaPagamento { get; set; }

        // Relação com ItensPedido
        public virtual ICollection<ItemPedido> ItensPedido { get; set; }

        // Propriedade calculada para valor total
        public decimal ValorTotal => ItensPedido?.Sum(ip => ip.ValorTotal) ?? 0;

        public override void Validate()
        {
            if (ClienteId == 0)
                AdicionarCritica("Cliente não informado");
            if (FormaPagamentoId == 0)
                AdicionarCritica("Forma de pagamento não informada");
            if (!ItensPedido.Any())
                AdicionarCritica("Pedido deve ter pelo menos um item");
        }
    }
}