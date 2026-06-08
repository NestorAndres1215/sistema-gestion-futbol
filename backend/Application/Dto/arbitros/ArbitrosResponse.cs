
namespace Application.Dto.Arbitros;

public class ArbitrosResponse
{
    public int Id {  get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido {  get; set; } = string.Empty;
    public string? Categoria { get; set; } = string.Empty;
    public string Pais {  get; set; } = string.Empty;
    public string Ciudad {  get; set; } = string.Empty;
    public string? Foto { get; set; } = string.Empty;
    public DateTime? FechaDebut { get; set; }
    public string Estado { get; set; } = string.Empty;
}
