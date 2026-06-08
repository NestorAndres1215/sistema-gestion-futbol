
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
    public Entrenadores? Entrenador { get; set; }
    public Clubes? Club { get; set; }
}
