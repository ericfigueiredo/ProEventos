using DJERICMAX_App.Dominio.Entidades;
using System;

namespace DJERICMAX_App.Dominio.Contratos
{
    public interface IEventoRepositorio : IBaseRepositorio<Evento>
    {
        Evento Obter(string nomeEvento, DateTime dataEvento);
        Evento Obter(string nomeEvento);
        Evento Obter(DateTime dataEvento);
    }
}
