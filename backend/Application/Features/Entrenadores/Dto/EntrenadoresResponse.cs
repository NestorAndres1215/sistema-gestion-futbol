namespace Application.Features.Entrenadores.Dto;

public class EntrenadoresResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string PaisNacimiento { get; set; } = string.Empty;
    public string CiudadNacimiento { get; set; } = string.Empty;
    public DateTime? FechaNacimiento { get; set; }
    public string EstiloJuego { get; set; } = string.Empty;
    public DateTime? FechaDebut { get; set; }
    public string? FotoUrl { get; set; } = string.Empty;
}
