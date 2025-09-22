using System;
using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Parcela : Entidade
    {
        public int Id { get; set; }

        public int Numero { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataVencimento { get; set; }
        public bool Pago { get; set; }

        // Relação com Evento
        public int EventoId { get; set; }
        public virtual Evento Evento { get; set; }

        public override void Validate()
        {
            if (Valor <= 0)
                AdicionarCritica("Aviso: Valor da parcela deve ser maior que zero.");
            if (EventoId == 0)
                AdicionarCritica("Aviso: Parcela deve estar vinculada a um Evento.");
        }
    }
}
