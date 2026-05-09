using System;

namespace Domain.Entities;

public class Arbitros
{
    public int PersonaId { get; set; }

    // PERFIL ARBITRAL
    public string? Categoria { get; set; }

    public string? Especialidad { get; set; }

    // CARRERA
    public DateTime? FechaDebut { get; set; }

    public DateTime? FechaRetiro { get; set; }

    public int AnosExperiencia { get; set; } = 0;

    public int Nivel { get; set; } = 50;

    public int Reputacion { get; set; } = 50;

    public int PartidosDirigidos { get; set; } = 0;

    // ESTADO
    public string Estado { get; set; } = "Activo";

    // RELACIÓN
    public virtual Personas? Persona { get; set; }
}