namespace DJERICMAX_App.Dominio.Entidades
{
    public class ItemPedido : Entidade
    {
        public int Id { get; set; }

        // Relação com Evento
        public int EventoId { get; set; }
        public virtual Evento Evento { get; set; }

        // Relação com Servico
        public int ServicoId { get; set; }
        public virtual Servico Servico { get; set; }

        public int Quantidade_Horas { get; set; }
        public decimal PrecoUnitario { get; set; } // Adicionar preço unitário
        public decimal ValorTotal => Quantidade_Horas * PrecoUnitario; // Propriedade calculada

        public override void Validate()
        {
            if (ServicoId == 0)
                AdicionarCritica("Aviso: Não foi identificada a referência de Serviço.");
            if (Quantidade_Horas <= 0)
                AdicionarCritica("Aviso: Quantidade de horas deve ser maior que zero.");
            if (PrecoUnitario <= 0)
                AdicionarCritica("Aviso: Preço unitário deve ser maior que zero.");
        }
    }
}