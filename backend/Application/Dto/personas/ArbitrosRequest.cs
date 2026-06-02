using Microsoft.AspNetCore.Http;

namespace Application.Dto.personas;

public class ArbitrosRequest
{
    public required string Nombre { get; set; } = string.Empty;
    public required string Apellido { get; set; } = string.Empty;
    public DateTime? FechaNacimiento { get; set; }
    public required string PaisNacimiento { get; set; }=string.Empty;
    public required string CiudadNacimiento { get; set; }= string.Empty;
    public IFormFile? Foto { get; set; }
    public string? Categoria { get; set; }
    public string? RolArbitral { get; set; }
    public DateTime? FechaDebut { get; set; }
    public DateTime? FechaRetiro { get; set; }
    public int Nivel { get; set; }
    public int Reputacion { get; set; }
    public int PartidosDirigidos { get; set; }
    public int PrecisionDecisiones { get; set; }
    public int TarjetasAmarillas { get; set; }
    public int TarjetasRojas { get; set; }
    public string? EstadoFisico { get; set; }
    public int PersonasId {get; set; }
}
