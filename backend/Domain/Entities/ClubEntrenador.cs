
namespace Domain.Entities;

public class ClubEntrenador
{

    public int Id { get; set; }
    public int EntrenadorId { get; set; }
    public int ClubId { get; set; }
    public string Cargo { get; set; } = string.Empty;
    public string Estado { get; set; } = "Activo";
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public Entrenador? Entrenador { get; set; }
    public Club? Club { get; set; }
}
