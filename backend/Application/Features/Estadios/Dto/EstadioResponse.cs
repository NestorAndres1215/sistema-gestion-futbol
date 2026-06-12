namespace Application.Features.Estadios.Dto;

public class EstadioResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public DateTime? FechaApertura { get; set; }
    public string Ciudad { get; set; } = string.Empty;
    public string Pais { get; set; } = string.Empty;
    public int Capacidad { get; set; }
    public string FotoUrl { get; set; } = string.Empty;

}
