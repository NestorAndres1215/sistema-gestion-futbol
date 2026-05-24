namespace Application.Dto;

public class EntrenadorSeleccionDto
{
    public string Entrenador { get; set; } = string.Empty;
    public string Seleccion { get; set; } = string.Empty;
    public string Cargo { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }

}
