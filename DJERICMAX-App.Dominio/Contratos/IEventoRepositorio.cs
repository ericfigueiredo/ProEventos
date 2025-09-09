using DJERICMAX_App.Dominio.Entidades;
using System;
using System.Collections.Generic;

namespace DJERICMAX_App.Dominio.Contratos
{
    public interface IEventoRepositorio : IBaseRepositorio<Evento>
    {
        Evento Obter(string nomeEvento, DateTime dataEvento);
        Evento Obter(string nomeEvento);
        Evento Obter(DateTime dataEvento);
        Evento ObterEventoCompleto(int id);
        IEnumerable<Evento> ObterTodosCompletos();
    }
}