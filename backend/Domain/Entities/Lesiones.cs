using System;

namespace Domain.Entities;

public class Lesiones
{
    public int Id { get; set; }

    public int JugadorId { get; set; }

    public string Tipo { get; set; } = string.Empty; // Esguince, Rotura, etc.

    public string? Gravedad { get; set; } // Leve, Moderada, Grave

    public DateTime FechaInicio { get; set; }

    public DateTime? FechaFin { get; set; }

    public string Estado { get; set; } = "Activa";

    // RELACIÓN
    public virtual Jugadores? Jugador { get; set; }
}