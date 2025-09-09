using DJERICMAX_App.Dominio.Entidades;
using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Contratos
{
    public interface IClienteRepositorio : IBaseRepositorio<Cliente>
    {
        Cliente Obter(string nome, string telefone);
        Cliente Obter(string nome);
        Cliente ObterClienteComEventos(int id);
        IEnumerable<Cliente> ObterTodosComEventos();
    }
}