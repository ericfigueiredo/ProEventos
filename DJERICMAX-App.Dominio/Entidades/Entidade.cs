using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Dominio.Entidades
{
    public abstract class Entidade
    {
        private List<string> _mensagensValidacao { get; set; }
        private List<string> mensagemValidacao 
        {
            get { return _mensagensValidacao ?? (_mensagensValidacao = new List<string>()); }
        }

        protected void LimparMensagensValidacao()
        {
            mensagemValidacao.Clear();
        }

        protected void AdicionarCritica(string mensagem)
        {
            mensagemValidacao.Add(mensagem);
        }

        public string ObterMensagensValidacao()
        {
            return string.Join(".\n ", mensagemValidacao);
        }

        public abstract void Validate();
        public bool EhValido
        {
            get { return !mensagemValidacao.Any(); }
        }

    }
}
