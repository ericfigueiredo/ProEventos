using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class ClienteRepositorio : BaseRepositorio<Cliente>, IClienteRepositorio
    {
        public ClienteRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto) : base(dJERICMAX_AppContexto)
        {
        }

        public Cliente Obter(string nome, string telefone)
        {
            return DJERICMAX_AppContexto.Clientes.FirstOrDefault(c => c.Nome == nome && c.Telefone == telefone);
        }

        public Cliente Obter(string nome)
        {
            return DJERICMAX_AppContexto.Clientes.FirstOrDefault(c => c.Nome == nome);
        }

        // NOVO: Obter cliente com eventos e serviços
        public Cliente ObterClienteComEventos(int id)
        {
            return DJERICMAX_AppContexto.Clientes
                .Include(c => c.Eventos)
                    .ThenInclude(e => e.ItensPedido)
                        .ThenInclude(ip => ip.Servico)
                .Include(c => c.Eventos)
                    .ThenInclude(e => e.FormaPagamento)
                .FirstOrDefault(c => c.Id == id);
        }

        // NOVO: Obter todos clientes com eventos
        public IEnumerable<Cliente> ObterTodosComEventos()
        {
            return DJERICMAX_AppContexto.Clientes
                .Include(c => c.Eventos)
                    .ThenInclude(e => e.ItensPedido)
                        .ThenInclude(ip => ip.Servico)
                .Include(c => c.Eventos)
                    .ThenInclude(e => e.FormaPagamento)
                .AsNoTracking()
                .ToList();
        }
    }
}