
namespace Application.Dto;

public class TorneoDto
{
    public required string nombre { get; set; }
    public required string tipo { get; set; }
    public string tipoParticipante { get; set; } = string.Empty;
    public string descricpcion { get; set; } = string.Empty;
    public required string creado { get; set; }
    public string modificado { get; set; }= string.Empty;
    public int anio { get; set; }
    public string estado {  get; set; } = string.Empty;
    public DateTime fechaInicio { get; set; }
    public DateTime fechaFin { get; set; }
    public string categoria { get; set; } = string.Empty;
}
