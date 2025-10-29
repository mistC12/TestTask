using TestTask.DTO;
using TestTask.Models;

namespace TestTask.Services;

public interface ISubdivisionService : IService<Subdivision>
{
    Task<List<SubdivisionDTO>> GetAllDtoAsync();
    Task<Subdivision> UpdateDtoAsync(SubdivisionDTO entity);

}