using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto.estadisticas;

public class CompareDto
{
    public string Nombre { get; set; } = string.Empty;

    public double Valor1 { get; set; }

    public double Valor2 { get; set; }
}