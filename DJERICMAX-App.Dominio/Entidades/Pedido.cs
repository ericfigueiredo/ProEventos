using DJERICMAX_App.Dominio.ObjetoDeValor;
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
        public FormaPagamento FormaPagamento { get; set; }

        /// <summary>
        /// Pedido deve ter pelo menos um item de pedido
        /// ou muitos itens de pedidos
        /// </summary>
        public ICollection<ItemPedido> ItemPedido { get; set; }
    }
}
