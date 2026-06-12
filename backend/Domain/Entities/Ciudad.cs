

namespace Domain.Entities;

public class Ciudad
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public int PaisId { get; set; }

    public Pais? Pais { get; set; }
}