namespace Application.Features.Torneos.Dto;

public class TorneoRequest
{
    public required string nombre { get; set; }
    public required string tipo { get; set; }
    public string tipoParticipante { get; set; } = string.Empty;
    public string descricpcion { get; set; } = string.Empty;
    public required string creado { get; set; }
    public string modificado { get; set; }= string.Empty;
    public string estado {  get; set; } = string.Empty;

    public string categoria { get; set; } = string.Empty;
}
