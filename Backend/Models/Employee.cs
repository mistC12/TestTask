using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TestTask.Models;

public partial class Employee
{
    public int IdEmployee { get; set; }

    public string Fullname { get; set; } = null!;

    public DateOnly Datebirth { get; set; }

    public string Position { get; set; } = null!;

    public DateOnly Startdate { get; set; }

    public string Image { get; set; } = null!;

    public int? IdSubdivision { get; set; }

    [JsonIgnore]
    public virtual Subdivision? IdSubdivisionNavigation { get; set; }
}
