using DJERICMAX_App.Dominio.Entidades;
using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Contratos
{
    public interface IServicoRepositorio : IBaseRepositorio<Servico>
    {
        Servico ObterServicoComItensPedido(int id);
        IEnumerable<Servico> ObterTodosComItensPedido();
        void Detach(ItemPedido item);
    }
}