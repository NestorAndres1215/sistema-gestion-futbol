namespace Domain.Catalogs;

public static class TipoTorneo
{
    public const string CopaNacional = "Copa Nacional";
    public const string CopaInternacional = "Copa Internacional";
    public const string Ligas = "Ligas";
    public const string Temporada = "Temporada";

    public static readonly IReadOnlyList<string> All =
        new[]
        {
            CopaNacional,
            CopaInternacional,
            Ligas,
            Temporada
        };
}