using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TestTask.Models;

public partial class Subdivision
{
    public int IdSubdivision { get; set; }

    public string NameSubdivision { get; set; } = null!;

    public int? ParentId { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
    [JsonIgnore]
    public virtual ICollection<Subdivision> InverseParent { get; set; } = new List<Subdivision>();

    public virtual Subdivision? Parent { get; set; }
}
