using System.Text.Json.Serialization;
using TestTask.Models;
using TestTask.Services;

namespace TestTask.DTO;

public class SubdivisionDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? ParentId { get; set; }
    public List<Employee> Employees { get; set; } = new();
    public List<SubdivisionDTO> SubdivisionsChildrens { get; set; } = new();
    
    private List<Subdivision> _subdivisions;
    public IService<Employee> EmployeeService;

    public SubdivisionDTO(List<Subdivision> subdivisions)
    {
        _subdivisions = subdivisions;
    }
    [JsonConstructor]
    private SubdivisionDTO()
    {
    }

    public async Task<List<SubdivisionDTO>> CreateTree()
    {
        var emp = await EmployeeService.GetAllAsync();
        var subdivisionsDTO = new List<SubdivisionDTO>();
        foreach (var sub in _subdivisions)
        {
            if (sub.ParentId.HasValue) continue;
            subdivisionsDTO.Add(new SubdivisionDTO
            {
                Id = sub.IdSubdivision,
                Name = sub.NameSubdivision,
                ParentId = sub.ParentId,
                Employees = sub.Employees.ToList(),
                SubdivisionsChildrens = sub.InverseParent.Select(x => GetChildren(x)).ToList()
            });
        }
        return await Task.FromResult(subdivisionsDTO) ;
    }

    private SubdivisionDTO GetChildren(Subdivision subdivision)
    {
        var dto = new SubdivisionDTO()
        {
            Id = subdivision.IdSubdivision,
            Name = subdivision.NameSubdivision,
            ParentId = subdivision.ParentId,
            Employees = subdivision.Employees.ToList(),
            SubdivisionsChildrens = null
        };
        
        if (subdivision.InverseParent.Count <= 0 || subdivision.InverseParent is null)
            return dto;
          else
            dto.SubdivisionsChildrens = subdivision.InverseParent.Select(x => GetChildren(x)).ToList();  
        
        return dto;
    }
}
