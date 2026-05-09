using System.Collections.Generic;

namespace Domain.Entities;

public class Paises
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? CodigoISO { get; set; }
    public ICollection<Ciudades> Ciudades { get; set; }
        = new List<Ciudades>();
    public ICollection<Personas> Personas { get; set; }
        = new List<Personas>();
}