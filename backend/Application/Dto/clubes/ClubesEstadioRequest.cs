
namespace Application.Dto.clubes;

public class ClubesEstadioRequest
{
    public string Clubes { get; set; } = string.Empty;
    public string Estadio { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public DateTime? FechaIncio { get; set; }
    public DateTime? FechaFin { get; set; }
}
