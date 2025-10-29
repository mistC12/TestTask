using Microsoft.AspNetCore.Mvc;
using TestTask.Models;
using TestTask.Services;

namespace TestTask.Controllers;
[ApiController]
[Route("[controller]")]
public class EmployeeController : GenericController<Employee>
{
    public EmployeeController(IService<Employee> service) : base (service)
    {
        
    }
}