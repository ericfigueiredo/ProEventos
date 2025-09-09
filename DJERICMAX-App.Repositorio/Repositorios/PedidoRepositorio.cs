using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class PedidoRepositorio : BaseRepositorio<Pedido>, IPedidoRepositorio
    {
        public PedidoRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto) : base(dJERICMAX_AppContexto)
        {
        }

        // Obter pedido com itens básicos
        public Pedido ObterPedidoComItens(int id)
        {
            return DJERICMAX_AppContexto.Pedidos
                .Include(p => p.ItensPedido)
                .FirstOrDefault(p => p.Id == id);
        }

        // Obter todos pedidos com itens básicos
        public IEnumerable<Pedido> ObterTodosComItens()
        {
            return DJERICMAX_AppContexto.Pedidos
                .Include(p => p.ItensPedido)
                .AsNoTracking()
                .ToList();
        }

        // Obter pedido completo com todos os relacionamentos
        public Pedido ObterPedidoCompleto(int id)
        {
            return DJERICMAX_AppContexto.Pedidos
                .Include(p => p.ItensPedido)
                    .ThenInclude(ip => ip.Servico)
                .Include(p => p.Cliente)
                .Include(p => p.FormaPagamento)
                .FirstOrDefault(p => p.Id == id);
        }

        // Obter todos pedidos completos com todos os relacionamentos
        public IEnumerable<Pedido> ObterTodosCompletos()
        {
            return DJERICMAX_AppContexto.Pedidos
                .Include(p => p.ItensPedido)
                    .ThenInclude(ip => ip.Servico)
                .Include(p => p.Cliente)
                .Include(p => p.FormaPagamento)
                .AsNoTracking()
                .ToList();
        }
    }
}