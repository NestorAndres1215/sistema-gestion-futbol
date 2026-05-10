using System;
using System.Collections.Generic;
using System.Text;

using System;

namespace Domain.Entities;

public class Personas
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string? ApellidoMaterno { get; set; }
    public DateTime? FechaNacimiento { get; set; }
    public int? PaisNacimientoId { get; set; }
    public int? CiudadNacimientoId { get; set; }
    public int? AlturaCm { get; set; }
    public int? PesoKg { get; set; }
    public string? PieDominante { get; set; }
    public string? FotoUrl { get; set; }
    public string Estado { get; set; } = "Activo";
    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public DateTime? FechaActualizacion { get; set; }
    public Paises? PaisNacimiento { get; set; }
    public Ciudades? CiudadNacimiento { get; set; }
}
