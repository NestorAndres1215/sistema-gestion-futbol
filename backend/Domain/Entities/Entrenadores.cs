using System;

namespace Domain.Entities;

public class Entrenadores
{
    public int Id { get; set; }
    public int PersonaId { get; set; }
    public string? EstiloJuego { get; set; }
    public string? Licencia { get; set; }
    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }
    public int AnosExperiencia { get; set; } = 0;
    public int Nivel { get; set; } = 50;
    public int Reputacion { get; set; } = 50;
    public decimal? Salario { get; set; }
    public string Estado { get; set; } = "Activo";
    public virtual Personas? Persona { get; set; }
}