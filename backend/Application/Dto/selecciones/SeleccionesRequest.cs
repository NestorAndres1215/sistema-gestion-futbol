using Microsoft.AspNetCore.Http;

namespace Application.Dto.Selecciones;

public class SeleccionesRequest
{
    public string Nombre { get; set; } = string.Empty;
    public string Confederacion { get; set; } = string.Empty;
    public string Clave { get; set; } = string.Empty;
    public string Seudonimo { get; set; } = string.Empty;
    public string CodigoFIFA { get; set; } = string.Empty;
    public string Pais { get; set; } = string.Empty;
    public IFormFile? Bandera { get; set; }
    public IFormFile? Escudo{ get; set; }
    public string? Estado { get; set; }

}
