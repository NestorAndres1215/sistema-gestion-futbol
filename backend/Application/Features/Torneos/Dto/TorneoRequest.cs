namespace Application.Features.Torneos.Dto;

public class TorneoRequest
{
    public required string Nombre { get; set; }
    public required string Tipo { get; set; }
    public string TipoParticipante { get; set; } = string.Empty;

    public string Descripcion { get; set; } = string.Empty;

    public required string Creado { get; set; } 

    public string Modificado { get; set; } = string.Empty;

    public string Estado { get; set; } = string.Empty;

}