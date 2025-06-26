using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Repositorio.Contexto;
using System.Collections.Generic;
using System.Linq;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class BaseRepositorio<TEntity> : IBaseRepositorio<TEntity> where TEntity : class
    {
        protected readonly DJERICMAX_AppContexto DJERICMAX_AppContexto;

        /// <summary>
        /// Este é o construtor do BaseRepositorio
        /// </summary>
        public BaseRepositorio(DJERICMAX_AppContexto dJERICMAX_AppContexto)
        {
            DJERICMAX_AppContexto = dJERICMAX_AppContexto;
        }

        /// <summary>
        /// Abaixo, os métodos CRUD vindos dos contratos de Dominio
        /// </summary>
        /// <param name="entity"></param>
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

        public IEnumerable<TEntity> ObterTodos()
        {
            return DJERICMAX_AppContexto.Set<TEntity>().ToList();
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
    }
}
