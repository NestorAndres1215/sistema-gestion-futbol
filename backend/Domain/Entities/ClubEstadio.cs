

namespace Domain.Entities;

public class ClubEstadio
{
    public int Id { get; set; }
    public int ClubesId { get; set; }
    public int EstadioId { get; set; }
    public string Tipo { get; set; } = "Principal";
    public DateTime? FechaIncio { get; set; }
    public DateTime? FechaFin {  get; set; }
    public Club? Club {  get; set; }
    public Estadio? Estadio { get; set; }

}
