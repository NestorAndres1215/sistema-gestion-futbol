

namespace Application.Dto.selecciones;

public class SeleccionesResponse
{
    public int Id { get; set; }
    public string Clave { get; set; } = string.Empty;
    public string Seleccion { get; set; } = string.Empty;
    public string Confederacion { get; set; } = string.Empty;
    public string CodigoFIFA { get; set; } = string.Empty;
    public string Seudonimo { get; set; } = string.Empty;
    public string? FotoUrl { get; set; } = string.Empty;


}
