namespace Domain.Catalogs;

public static class Estado
{
    public const string Activo = "Activo";
    public const string Inactivo = "Inactivo";
    public const string Bloqueado = "Bloqueado";

    public static readonly IReadOnlyList<string> All =
        new[]
        {
            Activo,
            Inactivo,
            Bloqueado
        };
}