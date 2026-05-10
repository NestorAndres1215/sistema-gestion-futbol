using Domain.Entities;

public class Arbitros
{
    public int Id { get; set; }

    public int PersonaId { get; set; }

    public string? Categoria { get; set; }
    public string? Especialidad { get; set; }

    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }

    public int AnosExperiencia { get; set; }
    public int Nivel { get; set; }
    public int Reputacion { get; set; }
    public int PartidosDirigidos { get; set; }

    public string Estado { get; set; } = "Activo";

    public Personas Persona { get; set; } = null!;
}