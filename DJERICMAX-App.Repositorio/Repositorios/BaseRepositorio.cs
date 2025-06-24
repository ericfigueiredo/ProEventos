using DJERICMAX_App.Dominio.Contratos;
using System.Collections.Generic;

namespace DJERICMAX_App.Repositorio.Repositorios
{
    public class BaseRepositorio<TEntity> : IBaseRepositorio<TEntity> where TEntity : class
    {
        /// <summary>
        /// Este é o construtor do BaseRepositorio
        /// </summary>
        public BaseRepositorio()
        {

        }

        /// <summary>
        /// Abaixo, os métodos CRUD vindos dos contratos de Dominio
        /// </summary>
        /// <param name="entity"></param>
        public void Adicionar(TEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public void Atualizar(TEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public TEntity ObterPorId(int id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<TEntity> ObterTodos()
        {
            throw new System.NotImplementedException();
        }

        public void Remover(TEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public void Dispose()
        {
            throw new System.NotImplementedException();
        }
    }
}
