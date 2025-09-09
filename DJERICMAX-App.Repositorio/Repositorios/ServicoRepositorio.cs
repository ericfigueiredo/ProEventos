using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class ServicoRepositorio : BaseRepositorio<Servico>, IServicoRepositorio
    {
        public ServicoRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto) : base(dJERICMAX_AppContexto)
        {
        }

        // NOVO: Obter serviço com itens de pedido
        public Servico ObterServicoComItensPedido(int id)
        {
            return DJERICMAX_AppContexto.Servicos
                .Include(s => s.ItensPedido)
                    .ThenInclude(ip => ip.Evento)
                .FirstOrDefault(s => s.Id == id);
        }

        // NOVO: Obter todos serviços com itens de pedido
        public IEnumerable<Servico> ObterTodosComItensPedido()
        {
            return DJERICMAX_AppContexto.Servicos
                .Include(s => s.ItensPedido)
                    .ThenInclude(ip => ip.Evento)
                .AsNoTracking()
                .ToList();
        }
    }
}