using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto;

public class EntrenadoresDto
{
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string? ApellidoMaterno { get; set; }
    public DateTime? FechaNacimiento { get; set; }
    public string PaisNacimiento { get; set; }=string.Empty;
    public string CiudadNacimiento { get; set; }= string.Empty;
    public int? AlturaCm { get; set; }
    public int? PesoKg { get; set; }
    public string? PieDominante { get; set; }
    public IFormFile? Foto { get; set; }
    public string EstadoPersona { get; set; } = "Activo";
    public string? EstiloJuego { get; set; }
    public string? Licencia { get; set; }
    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }
    public int AnosExperiencia { get; set; } = 0;
    public int Nivel { get; set; } = 50;
    public int Reputacion { get; set; } = 50;
    public decimal? Salario { get; set; }
    public string EstadoEntrenador { get; set; } = "Activo";
    public int? PersonaId { get; set; }
}
