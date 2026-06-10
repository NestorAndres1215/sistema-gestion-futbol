namespace Domain.Catalogs;

public static class TipoCesped
{
    public const string Natural = "Natural";
    public const string Sintetico = "Sintético";
    public const string Hibrido = "Híbrido";

    public static readonly IReadOnlyList<string> All =
        new[]
        {
            Natural,
            Sintetico,
            Hibrido
        };
}