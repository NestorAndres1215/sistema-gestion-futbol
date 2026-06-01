namespace Application.Dto.torneo;

public class SedeRequest
{
    public required string sede { get; set; }
    public bool principal { get; set; }
    public int edicionTorneo { get; set; }
    
}
