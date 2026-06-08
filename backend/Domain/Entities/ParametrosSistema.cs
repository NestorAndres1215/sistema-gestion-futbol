namespace Domain.Entities;

public class ParametrosSistema
{
    public int Id { get; set; }
    public string Clave { get; set; } = string.Empty;
    public string Valor { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string TipoDato { get; set; } = string.Empty;
    public string Estado { get; set; } = "ACTIVO";
    public string Editable { get; set; } = "SI";
    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaActualizacion { get; set; }
}