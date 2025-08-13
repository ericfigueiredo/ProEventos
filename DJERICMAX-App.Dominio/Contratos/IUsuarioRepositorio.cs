using DJERICMAX_App.Dominio.Entidades;

namespace DJERICMAX_App.Dominio.Contratos
{
    public interface IUsuarioRepositorio : IBaseRepositorio<Usuario>
    {
        Usuario Obter(string email, string senha);
        Usuario Obter(string email);
    }
}
