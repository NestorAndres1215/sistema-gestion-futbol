using Microsoft.AspNetCore.Http;

namespace Application.Features.Clubes.Dto;

public class ClubesRequest
{

    public string Nombre { get; set; } = string.Empty;
    public string Seudonimo { get; set; } = string.Empty;
    public string Confederacion { get; set; } = string.Empty;
    public string CodigoFifa { get; set; } = string.Empty;
    public string Pais { get; set; } = string.Empty;
    public string Ciudad { get; set; } = string.Empty;
    public DateTime? FechaFundacion { get; set; }
    public IFormFile? EscudoUrl { get; set; }
}
