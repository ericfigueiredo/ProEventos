using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Repositorios;

namespace DJERICMAX_App.Repositorio
{
    public class Cliente
    {
        public Cliente()
        {
            var usuarioRepositorio = new UsuarioRepositorio();
            var produto = new Produto();
            var usuario = new Usuario();
            usuarioRepositorio.Adicionar(usuario);
        }
    }
}
