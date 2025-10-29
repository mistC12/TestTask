using Microsoft.AspNetCore.Mvc;
using TestTask.DTO;
using TestTask.Models;
using TestTask.Services;

namespace TestTask.Controllers;

[ApiController]
[Route("[controller]")]
public class SubdivisionController : GenericController<Subdivision>
{
    private readonly IService<Subdivision> _service;
    private readonly ISubdivisionService _subdivisionService;
    public SubdivisionController(IService<Subdivision> service,ISubdivisionService subdivisionService) : base(service)
    {
        _service = service;
        _subdivisionService = subdivisionService;
    }

    [HttpGet("dto")]
    public async Task<IActionResult> GetSubdivisionsDto()
    {
        var t = await _subdivisionService.GetAllDtoAsync();
        return Ok(t);
    }

    [HttpPut("PutDto")]
    public async Task<IActionResult> Put([FromBody] SubdivisionDTO entity)
    {
        return Ok(await _subdivisionService.UpdateDtoAsync(entity));
    }

    [HttpPost("PostDto")]
    public async Task<IActionResult> Post([FromBody] SubdivisionDTO entity)
    {
        return Ok(await _subdivisionService.AddAsync(new Subdivision()
            {ParentId = entity.ParentId,NameSubdivision = entity.Name}));
    }
}
