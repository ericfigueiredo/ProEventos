using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;
using System.Linq;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class ClienteRepositorio : BaseRepositorio<Cliente>, IClienteRepositorio
    {
        public ClienteRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto) : base(dJERICMAX_AppContexto)
        {
        }

        public Cliente Obter(string nome, string sobrenome)
        {
            return DJERICMAX_AppContexto.Clientes.FirstOrDefault(c => c.Nome == nome && c.SobreNome == sobrenome);
        }

        public Cliente Obter(string nome)
        {
            return DJERICMAX_AppContexto.Clientes.FirstOrDefault(c => c.Nome == nome);
        }
    }
    
}
