using System.Collections.Generic;

namespace Domain.Entities;

public class Paises
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? CodigoISO { get; set; }
}