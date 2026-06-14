using Domain.Entities;

public class Arbitro
{
    public int Id { get; set; }

    public int PersonaId { get; set; }

    public string? Categoria { get; set; }
    // FIFA / Nacional / Regional

    public string? RolArbitral { get; set; }
    // Principal / VAR / Asistente

    public DateTime? FechaDebut { get; set; }

    public DateTime? FechaRetiro { get; set; }

    public int AnosExperiencia { get; set; }
    // NIVEL GENERAL 1- 100
    public int Nivel { get; set; }
   ///  RESPETO ES
    public int Reputacion { get; set; }
    // DECISIONES ACETADAS
    public int PartidosDirigidos { get; set; }

    public int PrecisionDecisiones { get; set; }

    public int TarjetasAmarillas { get; set; }

    public int TarjetasRojas { get; set; }
    // Activo / Fatigado / Lesionado
    public string? EstadoFisico { get; set; }
    
    // ACTIVO Y RETIRO
    public string Estado { get; set; } = "Activo";

    public Persona Persona { get; set; } = null!;
}