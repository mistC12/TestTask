using TestTask.Repo;

namespace TestTask.Services;

public class Service<T> : IService<T> where T : class
{
    private readonly IRepository<T> _repository;
    public Service(IRepository<T> repository)
    {
        _repository = repository;
    }
    public async Task<T> AddAsync(T entity)
    {
        return await _repository.AddAsync(entity);
    }

    public async Task<T> UpdateAsync(T entity)
    {
       return await _repository.UpdateAsync(entity);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task<T?> GetByIdAsync(int id)
    {
       return await _repository.GetByIdAsync(id);
    }

    public virtual async Task<List<T>> GetAllAsync()
    {
       return await _repository.GetAllAsync();
    }
}