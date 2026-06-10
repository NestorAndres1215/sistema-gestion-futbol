namespace Domain.Catalogs;

public static class Generos
{
    public const string Masculino = "Masculino";
    public const string Femenino = "Femenino";
    public const string Mixto = "Mixto";

    public static readonly IReadOnlyList<string> All = new[]
    {
        Masculino,
        Femenino,
        Mixto
    };
}