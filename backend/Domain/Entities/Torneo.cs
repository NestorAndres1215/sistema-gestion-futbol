namespace Domain.Entities
{
    public class Torneo
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Tipo { get; set; }
        public string Genero { get; set; }
        public string? Descripcion { get; set; }
        public string Estado { get; set; } = "Activo";
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public int? CreadoPor { get; set; }
        public int? ModificadoPor { get; set; }
    }
}