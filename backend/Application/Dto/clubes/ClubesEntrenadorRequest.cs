using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto.Clubes;

public class ClubesEntrenadorRequest
{
    public int Entrenador { get; set; }
    public string Clubes { get; set; } = string.Empty;
    public string Cargo { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
}
