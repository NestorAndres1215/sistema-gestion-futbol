using System;

namespace Domain.Entities;

public class Entrenador
{
    public int Id { get; set; }
    public int PersonaId { get; set; }
    public string? EstiloJuego { get; set; }
    // ofensivo / defensivo / equilibrado
    public string? SistemaTactico { get; set; }
    // 4-3-3 / 4-4-2 / 3-5-2
    public string? Licencia { get; set; }
    // UEFA Pro / Nacional / etc.
    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }
    public int AnosExperiencia { get; set; } = 0;
    public int Nivel { get; set; } = 50;
    public int Reputacion { get; set; } = 50;
    public int ManejoEquipo { get; set; } = 50;
    public int Motivacion { get; set; } = 50;
    public int Disciplina { get; set; } = 50;
    public int Adaptabilidad { get; set; } = 50;
    public string Estado { get; set; } = "Activo";
    public  Persona? Persona { get; set; }
}