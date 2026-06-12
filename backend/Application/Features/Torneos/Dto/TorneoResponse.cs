namespace Application.Features.Torneos.Dto;

public class TorneoResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string TipoParticipante {  get; set; } = string.Empty;
    public string Estado {  get; set; } = string.Empty;
    
}
