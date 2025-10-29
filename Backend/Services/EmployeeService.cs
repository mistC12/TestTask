using TestTask.Models;
using TestTask.Repo;

namespace TestTask.Services;

public class EmployeeService : Service<Employee> , IEmployeeService
{
    public EmployeeService(IRepository<Employee> repository) : base(repository)
    {
        
    }
}