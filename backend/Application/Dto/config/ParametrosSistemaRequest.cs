namespace Application.Dto.config;

public class ParametrosSistemaRequest
{
    public string Clave { get; set; } = string.Empty;
    public string Valor { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public string? Categoria { get; set; }
    public string TipoDato { get; set; } = string.Empty;
    public string Estado { get; set; } = "ACTIVO";
    public string Editable { get; set; } = "SI";
}
