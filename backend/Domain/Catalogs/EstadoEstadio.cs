namespace Domain.Catalogs;

public static class EstadoEstadio
{
    public const string Disponible = "Disponible";
    public const string Mantenimiento = "Mantenimiento";
    public const string Suspendido = "Suspendido";
    public const string Remodelacion = "Remodelación";
    public const string Cerrado = "Cerrado";

    public static readonly IReadOnlyList<string> All = new List<string>
    {
        Disponible,
        Mantenimiento,
        Suspendido,
        Remodelacion,
        Cerrado
    };
}