using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto;

public class ArbitrosDto
{
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
    public string EstadoPersona { get; set; } = "Activo";
    public string EstadoArbitro { get; set; } = "Activo";
    public string? Categoria { get; set; }
    public string? Especialidad { get; set; }
    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }
    public int AnosExperiencia { get; set; } = 0;
    public int Nivel { get; set; } = 50;
    public int Reputacion { get; set; } = 50;
    public int PartidosDirigidos { get; set; } = 0;
}
