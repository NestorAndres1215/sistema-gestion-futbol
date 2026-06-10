namespace Domain.Catalogs;

public static class PieDominante
{
    public const string Derecho = "Derecho";
    public const string Izquierdo = "Izquierdo";

    public static readonly IReadOnlyList<string> All =
        new[]
        {
            Derecho,
            Izquierdo
        };
}
