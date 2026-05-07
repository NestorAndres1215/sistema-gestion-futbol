namespace Domain.Entities;

public class Sede
{
    public int Id { get; set; }
    public string Pais { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; }
}