using DJERICMAX_App.Dominio.Entidades;

namespace DJERICMAX_App.Dominio.Contratos
{
    public interface IClienteRepositorio : IBaseRepositorio<Cliente>
    {
        Cliente Obter(string nome, string telefone);
        Cliente Obter(string nome);
    }
}
