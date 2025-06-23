using System;
using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Pedido
    {
        public int Id { get; set; }
        public DateTime Data_Cadastro { get; set; }
        public DateTime Data_Contrato { get; set; }
        public DateTime Data_Evento { get; set; }
        public bool Parcelado { get; set; }
        public int Qtde_Parcelas { get; set; }
        public int UsuarioId { get; set; }

        /// <summary>
        /// Pedido deve ter pelo menos um pedido
        /// ou muitos pedidos
        /// </summary>
        public ICollection<ItemPedido> ItemPedido { get; set; }
    }
}
