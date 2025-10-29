using Microsoft.AspNetCore.Mvc;
using TestTask.Services;

namespace TestTask.Controllers;

[ApiController]
[Route("[controller]")]

public class GenericController<T> : ControllerBase where T : class
{
    private readonly IService<T> _service;
    public GenericController(IService<T> service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] T entity)
    {
        return Ok(await _service.AddAsync(entity));
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] T entity)
    {
        return Ok(await _service.UpdateAsync(entity));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _service.GetAllAsync();
        return Ok(data);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        Console.WriteLine($"Пришло {id}");
        //await _service.DeleteAsync(id);
        return Ok(id);
    }
}