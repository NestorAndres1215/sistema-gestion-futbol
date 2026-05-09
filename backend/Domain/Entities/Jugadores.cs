using System;

namespace Domain.Entities;

public class Jugadores
{
    public int PersonaId { get; set; }

    // PERFIL FUTBOLÍSTICO
    public string PosicionPrincipal { get; set; } = string.Empty;

    public string? PosicionSecundaria { get; set; }

    public string? PiernaHabil { get; set; }

    // CARRERA
    public DateTime? FechaDebut { get; set; }

    public DateTime? FechaRetiro { get; set; }

    public int AnosExperiencia { get; set; } = 0;

    // ESTADO
    public string Estado { get; set; } = "Activo";

    public string EstadoFisico { get; set; } = "Disponible";

    // RELACIÓN
    public virtual Personas? Persona { get; set; }
}