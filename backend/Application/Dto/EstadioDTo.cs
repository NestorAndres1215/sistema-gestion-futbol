using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto;

public  class EstadioDTo
{
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;

    public DateTime? FechaApertura { get; set; }
    public int? Anio { get; set; }
    public string Ciudad { get; set; } = string.Empty;
    public string Pais { get; set; } = string.Empty;
    public decimal? Latitud { get; set; } 
    public decimal? Longitud { get; set; }
    public int Capacidad { get; set; }
    public string TipoCesped { get; set; } = string.Empty;
    public IFormFile? Foto { get; set; }

}
