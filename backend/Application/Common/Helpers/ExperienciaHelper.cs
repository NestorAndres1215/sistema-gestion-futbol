
namespace Application.Common.Helpers;

public static class ExperienciaHelper
{
    public static int Calcular(DateTime? fechaDebut)
    {
        if (!fechaDebut.HasValue)
            return 0;

        var hoy = DateTime.Today;
        var fecha = fechaDebut.Value.Date;

        var anos = hoy.Year - fecha.Year;

        if (hoy < fecha.AddYears(anos))
            anos--;

        return Math.Max(0, anos);
    }
}