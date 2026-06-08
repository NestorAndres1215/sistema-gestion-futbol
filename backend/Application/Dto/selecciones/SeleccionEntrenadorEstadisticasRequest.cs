using Domain.Entities;

namespace Application.Dto.Selecciones;

public class SeleccionEntrenadorEstadisticasRequest
{
    public int EntrenadorSeleccion { get; set; }
    public int PartidosDirigidos { get; set; }
    public int Victorias { get; set; }
    public int Empates { get; set; }
    public int Derrotas { get; set; }
    public int GolesFavor { get; set; }
    public int GolesContra { get; set; }
    public int TitulosGanados { get; set; }

}
