namespace DJERICMAX_App.Dominio.Entidades
{
    public class Servico : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco_Hora { get; set; }

        public override void Validate()
        {
            throw new System.NotImplementedException();
        }
    }
}
