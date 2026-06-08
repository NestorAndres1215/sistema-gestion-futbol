using Microsoft.AspNetCore.Http;

namespace Application.Dto.Estadio;

public  class EstadioRequest
{
    public required string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;

    public DateTime? FechaApertura { get; set; }
    public int? Anio { get; set; }
    public required string Ciudad { get; set; } = string.Empty;
    public required string Pais { get; set; } = string.Empty;
    public decimal? Latitud { get; set; } 
    public decimal? Longitud { get; set; }
    public required int Capacidad { get; set; }
    public string TipoCesped { get; set; } = string.Empty;
    public IFormFile? Foto { get; set; }

}
