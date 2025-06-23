namespace DJERICMAX_App.Dominio.Entidades
{
    public class ItemPedido : Entidade
    {
        public int Id { get; set; }
        public int ServicoId { get; set; }
        public int Quantidade_Horas { get; set; }

        public override void Validate()
        {
            throw new System.NotImplementedException();
        }
    }
}
