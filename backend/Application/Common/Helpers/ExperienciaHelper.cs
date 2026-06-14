
using Microsoft.AspNetCore.Http;

namespace Application.Common.Helpers;

public static class ExperienciaHelper
{
    public static int Calcular(DateTime fechaInicio, DateTime? fechaFin = null)
    {
        var fin = fechaFin ?? DateTime.Today;

        var anos = fin.Year - fechaInicio.Year;

        if (fin < fechaInicio.AddYears(anos))
            anos--;

        return Math.Max(0, anos);
    }


}