namespace Domain.Entities;

public class SeleccionEstadio
{
    public int Id { get; set; }
    public int SeleccionId { get; set; }
    public int EstadioId { get; set; }
    public string Tipo { get; set; } = "Principal";
    public Selecciones? Seleccion { get; set; }
    public Estadio? Estadio { get; set; }
}