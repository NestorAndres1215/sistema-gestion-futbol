namespace Application.Dto.entrenadores;

public class EntrenadoresResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string PaisNacimiento { get; set; } = string.Empty;
    public string CiudadNacimiento { get; set; } = string.Empty;
    public DateTime? FechaNacimiento { get; set; }
    public string EstiloJuego { get; set; } = string.Empty;
    public string FechaDebut { get; set; } = string.Empty;
    public string? FotoUrl { get; set; } = string.Empty;
}
