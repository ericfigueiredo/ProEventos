using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IBaseRepositorio<TEntity> : IDisposable where TEntity : class
{
    void Adicionar(TEntity entity);
    Task AdicionarAsync(TEntity entity);
    TEntity ObterPorId(int id);
    Task<TEntity> ObterPorIdAsync(int id);
    IEnumerable<TEntity> ObterTodos();
    Task<IEnumerable<TEntity>> ObterTodosAsync();
    void Atualizar(TEntity entity);
    void Remover(TEntity entity);
}