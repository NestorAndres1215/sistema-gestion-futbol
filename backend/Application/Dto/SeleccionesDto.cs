

using Microsoft.AspNetCore.Http;

namespace Application.Dto;

public class SeleccionesDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Confederacion { get; set; } = string.Empty;
    public string? Clave { get; set; } 
    public string? Seudonimo { get; set; }
    public string CodigoFIFA { get; set; } = string.Empty;
    public string? Pais { get; set; }
    public IFormFile? Bandera { get; set; }
    public IFormFile? Escudo{ get; set; }
    public string? Estado { get; set; }

}
