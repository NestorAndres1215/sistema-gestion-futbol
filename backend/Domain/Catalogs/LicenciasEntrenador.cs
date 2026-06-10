namespace Domain.Catalogs;

public static class LicenciasEntrenador
{
    public const string Nacional = "Nacional";
    public const string CONMEBOL = "CONMEBOL";
    public const string UEFA_A = "UEFA A";
    public const string UEFA_Pro = "UEFA Pro";
    public const string FIFA_Elite = "FIFA Elite";

    public static readonly IReadOnlyList<string> All =
        new[]
        {
            Nacional,
            CONMEBOL,
            UEFA_A,
            UEFA_Pro,
            FIFA_Elite
        };
}