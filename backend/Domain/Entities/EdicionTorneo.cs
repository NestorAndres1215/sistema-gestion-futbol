namespace Domain.Entities;

public class EdicionTorneo
{
    public int Id { get; set; }
    public int TorneoId { get; set; }
    public int CategoriaId { get; set; }
    public int Anio { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Genero {  get; set; } = string.Empty;
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public string Estado { get; set; } = "Planificado";
    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaActualizacion { get; set; }
    public Torneo? Torneo { get; set; }
    public Categoria? Categoria { get; set; }
}