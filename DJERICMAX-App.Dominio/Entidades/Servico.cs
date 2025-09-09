using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Servico : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco_Hora { get; set; }
        public string NomeArquivo { get; set; }

        // Adicionar relação com ItensPedido
        public virtual ICollection<ItemPedido> ItensPedido { get; set; }

        public override void Validate()
        {
            if (string.IsNullOrEmpty(Nome))
                AdicionarCritica("Aviso: Nome não foi preenchido corretamente");
            if (string.IsNullOrEmpty(Descricao))
                AdicionarCritica("Aviso: Descrição não foi informada");
            if (Preco_Hora <= 0)
                AdicionarCritica("Aviso: Preço precisa ser preenchido corretamente");
        }
    }
}
