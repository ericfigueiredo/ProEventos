using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

public interface IBaseRepositorio<TEntity> : IDisposable where TEntity : class
{
    void Adicionar(TEntity entity);
    Task AdicionarAsync(TEntity entity);
    TEntity ObterPorId(int id);
    TEntity ObterPorId(int id, params Expression<Func<TEntity, object>>[] includes); // << NOVO
    Task<TEntity> ObterPorIdAsync(int id);
    IEnumerable<TEntity> ObterTodos();
    IEnumerable<TEntity> ObterTodos(params Expression<Func<TEntity, object>>[] includes); // << NOVO
    Task<IEnumerable<TEntity>> ObterTodosAsync();
    void Atualizar(TEntity entity);
    void Remover(TEntity entity);
}
