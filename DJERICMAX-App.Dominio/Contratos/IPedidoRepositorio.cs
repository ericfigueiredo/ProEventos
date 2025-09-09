using DJERICMAX_App.Dominio.Entidades;
using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Contratos
{
    public interface IPedidoRepositorio : IBaseRepositorio<Pedido>
    {
        Pedido ObterPedidoComItens(int id);
        IEnumerable<Pedido> ObterTodosComItens();
        Pedido ObterPedidoCompleto(int id);
        IEnumerable<Pedido> ObterTodosCompletos();
    }
}