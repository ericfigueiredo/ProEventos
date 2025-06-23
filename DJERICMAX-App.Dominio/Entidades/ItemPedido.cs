namespace DJERICMAX_App.Dominio.Entidades
{
    public class ItemPedido : Entidade
    {
        public int Id { get; set; }
        public int ServicoId { get; set; }
        public int Quantidade_Horas { get; set; }

        public override void Validate()
        {
            if (ServicoId == 0)
                AdicionarCritica("Aviso: Não foi identificada a referência de Serviço.");
            if (Quantidade_Horas == 0)
                AdicionarCritica("Aviso: Não foi informada a quantidade de horas do evento.");
        }
    }
}
