

namespace Domain.Entities;

public class Ciudades
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public int PaisId { get; set; }

    public Paises? Pais { get; set; }
}