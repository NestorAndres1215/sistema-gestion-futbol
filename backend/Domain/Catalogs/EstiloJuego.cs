namespace Domain.Catalogs;

public static class EstilosJuego
{
    public const string Ofensivo = "Ofensivo";
    public const string Defensivo = "Defensivo";
    public const string Posesion = "Posesión";
    public const string Contraataque = "Contraataque";
    public const string PresionAlta = "Presión Alta";
    public const string Equilibrado = "Equilibrado";
    public const string TikiTaka = "Tiki-Taka";
    public const string JuegoDirecto = "Juego Directo";
    public const string JuegoVertical = "Juego Vertical";
    public const string Gegenpress = "Gegenpress";
    public const string BloqueBajo = "Bloque Bajo";
    public const string JuegoPorBandas = "Juego por Bandas";
    public const string Catenaccio = "Catenaccio";

    public static readonly IReadOnlyList<string> All = new[]
    {
        Ofensivo,
        Defensivo,
        Posesion,
        Contraataque,
        PresionAlta,
        Equilibrado,
        TikiTaka,
        JuegoDirecto,
        JuegoVertical,
        Gegenpress,
        BloqueBajo,
        JuegoPorBandas,
        Catenaccio
    };
}