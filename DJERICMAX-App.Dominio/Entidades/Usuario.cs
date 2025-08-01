using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public string FotoUrl { get; set; }

        /// <summary>
        /// Um usuário pode contratar nenhum ou muitos serviços
        /// </summary>
        public virtual ICollection<Pedido> Pedidos { get; set; }

        public override void Validate()
        {
            if (string.IsNullOrEmpty(Email))
                AdicionarCritica("Aviso: E-mail não informado.");
            if (string.IsNullOrEmpty(Senha))
                AdicionarCritica("Aviso: Senha não informada.");
        }
    }
}
