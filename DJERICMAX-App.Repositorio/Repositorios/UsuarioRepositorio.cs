using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;
using System.Linq;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepositorio
    {
        public UsuarioRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto) : base(dJERICMAX_AppContexto)
        {
        }

        public Usuario Obter(string email, string senha)
        {
            return DJERICMAX_AppContexto.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }

        public Usuario Obter(string email)
        {
            return DJERICMAX_AppContexto.Usuarios.FirstOrDefault(u => u.Email == email);
        }
    }
}
