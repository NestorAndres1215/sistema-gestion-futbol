namespace Domain.Constants;

public static class EspecialidadArbitro
{
    public const string Principal = "Principal";
    public const string VAR = "VAR";
    public const string Asistente = "Asistente";

    public static readonly IReadOnlyList<string> All = new[]
    {
        Principal,
        VAR,
        Asistente
    };
}