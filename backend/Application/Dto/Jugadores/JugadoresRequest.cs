using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto.Jugadores;

public class JugadoresRequest
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
    public string EstadoPersonas { get; set; } = "Activo";
    public string PosicionPrincipal { get; set; } = string.Empty;
    public string? PosicionSecundaria { get; set; }
    public string? PiernaHabil { get; set; }
    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }
    public int AnosExperiencia { get; set; } = 0;
    public string EstadoJugador { get; set; } = "Activo";
    public string EstadoFisico { get; set; } = "Disponible";

}
