using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto.clubes;

public class ClubesEntrenadorResponse
{
    public int Id { get; set; }
    public string Clubes { get; set; } = string.Empty;
    public string EntrenadorNombre { get; set; } = string.Empty;
    public string EntrenadorApellido { get; set; } = string.Empty;
    public string Cargo { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public string Estado { get; set; } = string.Empty;
}
