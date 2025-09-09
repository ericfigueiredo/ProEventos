using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class BaseRepositorio<TEntity> : IBaseRepositorio<TEntity> where TEntity : class
    {
        protected readonly DJERICMAX_AppContexto DJERICMAX_AppContexto;

        public BaseRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto)
        {
            DJERICMAX_AppContexto = dJERICMAX_AppContexto;
        }

        public void Adicionar(TEntity entity)
        {
            DJERICMAX_AppContexto.Set<TEntity>().Add(entity);
            DJERICMAX_AppContexto.SaveChanges();
        }

        public void Atualizar(TEntity entity)
        {
            DJERICMAX_AppContexto.Set<TEntity>().Update(entity);
            DJERICMAX_AppContexto.SaveChanges();
        }

        public TEntity ObterPorId(int id)
        {
            return DJERICMAX_AppContexto.Set<TEntity>().Find(id);
        }

        // NOVO: Obter por ID com includes
        public TEntity ObterPorId(int id, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = DJERICMAX_AppContexto.Set<TEntity>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.FirstOrDefault(e => EF.Property<int>(e, "Id") == id);
        }

        public IEnumerable<TEntity> ObterTodos()
        {
            return DJERICMAX_AppContexto.Set<TEntity>().ToList();
        }

        // NOVO: Obter todos com includes
        public IEnumerable<TEntity> ObterTodos(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = DJERICMAX_AppContexto.Set<TEntity>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.ToList();
        }

        public void Remover(TEntity entity)
        {
            DJERICMAX_AppContexto.Remove(entity);
            DJERICMAX_AppContexto.SaveChanges();
        }

        public void Dispose()
        {
            DJERICMAX_AppContexto.Dispose();
        }

        // Adicione estes métodos no BaseRepositorio
        public async Task<TEntity> ObterPorIdAsync(int id)
        {
            return await DJERICMAX_AppContexto.Set<TEntity>().FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> ObterTodosAsync()
        {
            return await DJERICMAX_AppContexto.Set<TEntity>().ToListAsync();
        }

        public async Task AdicionarAsync(TEntity entity)
        {
            await DJERICMAX_AppContexto.Set<TEntity>().AddAsync(entity);
            await DJERICMAX_AppContexto.SaveChangesAsync();
        }


    }
}