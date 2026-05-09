namespace Domain.Entities;

public class Estadio
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;

    public DateTime? FechaApertura { get; set; }
    public int? Anio { get; set; }

    public string Ciudad { get; set; } = string.Empty;
    public string Pais { get; set; } = string.Empty;

    public int Capacidad { get; set; }

    public string TipoCesped { get; set; } = string.Empty;

    public decimal? Latitud { get; set; }
    public decimal? Longitud { get; set; }

    public string FotoUrl { get; set; } = string.Empty;

    public string Estado { get; set; } = "Disponible";

    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaActualizacion { get; set; }
}