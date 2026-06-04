namespace Application.Dto.selecciones;

public class SeleccioEntrenadorRequest
{
    public int Entrenador { get; set; } 
    public string Seleccion { get; set; } = string.Empty;
    public string Cargo { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }

}
