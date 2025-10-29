using TestTask.DTO;
using TestTask.Models;
using TestTask.Repo;

namespace TestTask.Services;

public class SubdivisionService : Service<Subdivision>, ISubdivisionService
{
    private readonly IRepository<Subdivision> _repository;
    private readonly IService<Employee> _empService;
    
    public SubdivisionService(IRepository<Subdivision> repository,IService<Employee> empService) : base(repository)
    {
        _repository = repository;
        _empService = empService;
    }
    public async Task<List<SubdivisionDTO>> GetAllDtoAsync()
    {
        return await new SubdivisionDTO( await _repository.GetAllAsync()){EmployeeService = _empService}.CreateTree() ;
    }

    public async Task<Subdivision> UpdateDtoAsync(SubdivisionDTO entity)
    {
        var subdivision = await _repository.GetByIdAsync(entity.Id);
        subdivision.NameSubdivision = entity.Name;
        return await _repository.UpdateAsync(subdivision);
    }
}