namespace Domain.Entities;

public class Seleccion
{
    public int Id { get; set; }
    public required string Nombre { get; set; }
    public string Confederacion { get; set; } = string.Empty;
    public string Clave { get; set; } = string.Empty; 
    public string? Seudonimo { get; set; } = string.Empty;
    public string CodigoFIFA { get; set; } = string.Empty;
    public string? Pais { get; set; }
    public string? BanderaUrl { get; set; }
    public string? EscudoUrl { get; set; }
    public string Estado { get; set; } = "Activo";
    public DateTime? FechaCreacion { get; set; }
    public DateTime? FechaActualizacion { get; set; }
}