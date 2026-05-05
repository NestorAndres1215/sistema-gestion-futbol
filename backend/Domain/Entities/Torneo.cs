using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Torneo
    {
        public int Id { get; set; }

        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public string Genero { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; } = "Activo";
    }
}
