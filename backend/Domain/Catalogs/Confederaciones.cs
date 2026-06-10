namespace Domain.Catalogs;

public static class Confederaciones
{
    public const string CONMEBOL = "CONMEBOL";
    public const string UEFA = "UEFA";
    public const string CONCACAF = "CONCACAF";
    public const string AFC = "AFC";
    public const string CAF = "CAF";
    public const string OFC = "OFC";

    public static readonly IReadOnlyList<string> All = new List<string>
    {
        CONMEBOL,
        UEFA,
        CONCACAF,
        AFC,
        CAF,
        OFC
    };
}