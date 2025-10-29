using Microsoft.EntityFrameworkCore;
using TestTask.Models;

namespace TestTask.Repo;

public class Repository<T> : IRepository<T> where T : class 
{
    private readonly DbContext _context;
    private readonly DbSet<T> _entities;
    public Repository(EmployeeaccountingContext context)
    {
        _context = context;
        _entities = context.Set<T>();
    }
    public async Task<T> AddAsync(T entity)
    {
       await _entities.AddAsync(entity);
       await _context.SaveChangesAsync();
       return entity;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        _entities.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(int id)
    {
        _entities.Remove(await GetByIdAsync(id));
        await _context.SaveChangesAsync();
    }

    public async Task<T?> GetByIdAsync(int id)
    {
       return await _entities.FindAsync(id);
    }

    public async Task<List<T>> GetAllAsync()
    {
       return await _entities.ToListAsync();
    }
}