using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto
{
    public class TorneoDto
    {
        public string nombre { get; set; }
        public string tipo { get; set; }
        public string genero { get; set; }
        public string descricpcion { get; set; }
        public string creado { get; set; }
        public string? modificado { get; set; }
        public int anio { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFin { get; set; }
        public string categoria { get; set; }
    }
}
