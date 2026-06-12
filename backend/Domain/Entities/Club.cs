
namespace Domain.Entities;

public class Club
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Seudonimo { get; set; } = string.Empty;
    public string Confederacion { get; set; } = string.Empty;
    public string CodigoFifa { get; set; } = string.Empty;
    public string Pais { get; set; } = string.Empty;
    public string Ciudad { get; set; } = string.Empty;
    public DateTime? FechaFundacion { get; set; }
    public string EscudoUrl { get; set; } = string.Empty;
    public string Estado { get; set; } = "Activo";
    public DateTime? FechaCreacion { get; set; }
    public DateTime? FechaActualizacion { get; set; }

}
