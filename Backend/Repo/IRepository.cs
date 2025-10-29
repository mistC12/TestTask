namespace TestTask.Repo;

public interface IRepository<T> where T : class
{
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(int id);
    Task<T?> GetByIdAsync(int id);
    Task<List<T>> GetAllAsync();
}