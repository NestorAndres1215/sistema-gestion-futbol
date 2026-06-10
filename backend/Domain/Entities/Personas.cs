
namespace Domain.Entities;

public class Personas
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public DateTime? FechaNacimiento { get; set; }
    public int? PaisNacimientoId { get; set; }
    public int? CiudadNacimientoId { get; set; }
    public string? FotoUrl { get; set; }
    public string Genero { get; set; } = string.Empty;
    public string Estado { get; set; } = "Activo";
    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public DateTime? FechaActualizacion { get; set; }
    public Paises? PaisNacimiento { get; set; }
    public Ciudades? CiudadNacimiento { get; set; }
}
