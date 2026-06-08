

namespace Application.Dto.Selecciones;

public class SeleccionesResponse
{
    public int Id { get; set; }
    public string Clave { get; set; } = string.Empty;
    public string Seleccion { get; set; } = string.Empty;
    public string Confederacion { get; set; } = string.Empty;
    public string CodigoFIFA { get; set; } = string.Empty;
    public string Seudonimo { get; set; } = string.Empty;
    public string? Escudo { get; set; } = string.Empty;
    public string? Bandera {  get; set; } = string.Empty;


}
