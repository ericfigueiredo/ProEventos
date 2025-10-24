using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        // NOVO: Obter evento completo com relacionamentos
        public Evento ObterEventoCompleto(int id)
        {
            return DJERICMAX_AppContexto.Eventos
                .Include(e => e.Cliente)
                .Include(e => e.FormaPagamento)
                .Include(e => e.ItensPedido)
                    .ThenInclude(ip => ip.Servico)
                .Include(e => e.Parcelas)
                .FirstOrDefault(e => e.Id == id);
        }
        // NOVO: Obter todos eventos com relacionamentos
        public IEnumerable<Evento> ObterTodosCompletos()
        {
            return DJERICMAX_AppContexto.Eventos
                .Include(e => e.Cliente)
                .Include(e => e.FormaPagamento)
                .Include(e => e.ItensPedido)
                    .ThenInclude(ip => ip.Servico)
                .Include(e => e.Parcelas)
                .AsNoTracking()
                .ToList();
        }
        public void Adicionar(Evento evento)
        {
            evento.GerarParcelas();
            DJERICMAX_AppContexto.Eventos.Add(evento);
            DJERICMAX_AppContexto.SaveChanges();
        }
        public void Atualizar(Evento evento)
        {
            // Detach apenas o evento com mesmo Id (evita rastreamento duplo)
            var local = DJERICMAX_AppContexto.Set<Evento>()
                .Local
                .FirstOrDefault(entry => entry.Id == evento.Id);

            if (local != null)
            {
                DJERICMAX_AppContexto.Entry(local).State = EntityState.Detached;
            }
            // Garante que relacionamentos não sejam perdidos
            if (evento.Cliente != null)
                DJERICMAX_AppContexto.Attach(evento.Cliente);

            if (evento.FormaPagamento != null)
                DJERICMAX_AppContexto.Attach(evento.FormaPagamento);

            if (evento.ItensPedido != null)
            {
                foreach (var item in evento.ItensPedido)
                {
                    if (item.Servico != null)
                        DJERICMAX_AppContexto.Attach(item.Servico);

                    // Se o item já existir, marca como modificado
                    if (item.Id > 0)
                        DJERICMAX_AppContexto.Entry(item).State = EntityState.Modified;
                    else
                        DJERICMAX_AppContexto.Entry(item).State = EntityState.Added;
                }
            }

            if (evento.Parcelas != null)
            {
                foreach (var parcela in evento.Parcelas)
                {
                    if (parcela.Id > 0)
                        DJERICMAX_AppContexto.Entry(parcela).State = EntityState.Modified;
                    else
                        DJERICMAX_AppContexto.Entry(parcela).State = EntityState.Added;
                }
            }

            evento.GerarParcelas();

            // Atualiza o evento em si
            DJERICMAX_AppContexto.Entry(evento).State = EntityState.Modified;
            DJERICMAX_AppContexto.SaveChanges();
        }
    }
}