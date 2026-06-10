namespace Domain.Constants;

public static class CategoriaArbitro
{
    public const string FIFA = "FIFA";
    public const string Nacional = "Nacional";
    public const string Regional = "Regional";

    public static readonly IReadOnlyList<string> All = new[]
    {
        FIFA,
        Nacional,
        Regional
    };
}