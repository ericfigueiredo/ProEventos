using System;
using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Entidades
{
    public class Cliente : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public string Telefone{ get; set; }
        public string Email { get; set; }
        public string Logradouro { get; set; }
        public string Num_Logradouro { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }
        public string CEP { get; set; }
        public DateTime Data_Cadastro { get; set; }
        public int EhCliente { get; set; }

        /// <summary>
        /// Um usuário pode contratar nenhum ou muitos serviços
        /// </summary>
        public virtual ICollection<Evento> Eventos { get; set; }



        public override void Validate()
        {
            if (string.IsNullOrEmpty(Nome))
                AdicionarCritica("Aviso: Nome não informado.");
            if (string.IsNullOrEmpty(Telefone))
                AdicionarCritica("Aviso: Telefone não informada.");
            if (string.IsNullOrEmpty(Cidade))
                AdicionarCritica("Aviso: Cidade não informado.");
            if (string.IsNullOrEmpty(UF))
                AdicionarCritica("Aviso: UF não informado.");
        }
    }
}
