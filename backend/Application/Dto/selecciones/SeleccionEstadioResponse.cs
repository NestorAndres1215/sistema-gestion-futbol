namespace Application.Dto.Selecciones;

public class SeleccionEstadioResponse
{
    public int Id { get; set; }

    public string Seleccion { get; set; } = string.Empty;

    public string Estadio { get; set; } = string.Empty;

    public string Ciudad { get; set; } = string.Empty;

    public int Capacidad { get; set; }

    public string Tipo { get; set; } = string.Empty;
}