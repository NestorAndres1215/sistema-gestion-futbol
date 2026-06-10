namespace Domain.Catalogs;

public static class EstadoGenerico
{
    public const string Activo = "Activo";
    public const string Retirado = "Retirado";

    public static readonly IReadOnlyList<string> All =
        new[]
        {
            Activo,
            Retirado
        };
}