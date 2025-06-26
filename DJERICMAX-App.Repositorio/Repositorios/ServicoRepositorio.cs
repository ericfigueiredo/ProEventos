using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    class ServicoRepositorio : BaseRepositorio<Servico>, IServicoRepositorio
    {
        public ServicoRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto) : base(dJERICMAX_AppContexto)
        {
        }
    }
}
