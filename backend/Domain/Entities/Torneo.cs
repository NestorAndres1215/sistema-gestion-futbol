namespace Domain.Entities;


public class Torneo
{
    public int Id { get; set; }

    public required string Nombre { get; set; }
    public string Tipo { get; set; }=string.Empty;
    public string TipoParticipante { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public string Estado { get; set; } = "Activo";
    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaActualizacion { get; set; }
    public int? CreadoPor { get; set; }
    public int? ModificadoPor { get; set; }
}