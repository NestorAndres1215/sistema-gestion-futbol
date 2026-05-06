namespace Domain.Entities;

public class EdicionSede
{
    public int EdicionId { get; set; }
    public int SedeId { get; set; }
    public bool EsPrincipal { get; set; } = false;
    public DateTime FechaCreacion { get; set; }
    public EdicionTorneo? Edicion { get; set; }
    public Sede? Sede { get; set; }
}