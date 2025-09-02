using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;
using System;
using System.Linq;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class EventoRepositorio : BaseRepositorio<Evento>, IEventoRepositorio
    {
        public EventoRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto) : base(dJERICMAX_AppContexto)
        {
        }

        public Evento Obter(string nomeEvento, DateTime dataEvento)
        {
            return DJERICMAX_AppContexto.Eventos.FirstOrDefault(e => e.NomeEvento == nomeEvento && e.DataEvento == dataEvento);
        }

        public Evento Obter(string nomeEvento)
        {
            return DJERICMAX_AppContexto.Eventos.FirstOrDefault(e => e.NomeEvento == nomeEvento);
        }

        public Evento Obter(DateTime dataEvento)
        {
            return DJERICMAX_AppContexto.Eventos.FirstOrDefault(e => e.DataEvento == dataEvento);
        }
    }
}
