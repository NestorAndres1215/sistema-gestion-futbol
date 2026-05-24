
namespace Domain.Entities;

public class EstadisticasEntrenadorSeleccion
{
    public int Id { get; set; }
    public int EntrenadorSeleccionId { get; set; }
    public int PartidosDirigidos { get; set; }
    public int Victorias { get; set; }
    public int Empates {  get; set; }
    public int Derrotas { get; set; }
    public int GolesFavor {  get; set; }
    public int GolesContra { get; set; }
    public int TitulosGanados {  get; set; }
    public EntrenadorSeleccion entrenadorSeleccion { get; set; }

}
