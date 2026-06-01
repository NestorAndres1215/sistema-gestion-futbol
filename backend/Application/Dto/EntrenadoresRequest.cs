using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto;

public class EntrenadoresRequest
{
    public required string Nombre { get; set; } = string.Empty;
    public required string Apellido { get; set; } = string.Empty;
    public DateTime? FechaNacimiento { get; set; }
    public required string PaisNacimiento { get; set; } = string.Empty;
    public required string CiudadNacimiento { get; set; } = string.Empty;
    public IFormFile? Foto { get; set; }
    public string? EstiloJuego { get; set; }
    public string? Licencia { get; set; }
    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }
    public int AnosExperiencia { get; set; } = 0;
    public int Nivel { get; set; }
    public int Reputacion { get; set; }
    public int ManejoEquipo { get; set; }
    public int Motivacion { get; set; }
    public int Disciplina { get; set; }
    public int Adaptabilidad { get; set; }
    public int Estado { get; set; }
    public int? PersonaId { get; set; }
}
