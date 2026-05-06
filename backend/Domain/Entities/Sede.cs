namespace Domain.Entities;

public class Sede
{
    public int Id { get; set; }
    public string Pais { get; set; } = null!;
    public DateTime FechaCreacion { get; set; }
}