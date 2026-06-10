namespace Domain.Catalogs;

public static class TipoDato
{
    public const string STRING = "STRING";
    public const string INT = "INT";
    public const string BOOL = "BOOL";
    public const string DECIMAL = "DECIMAL";
    public const string DATE = "DATE";
    public const string TIME = "TIME";
    public const string JSON = "JSON";

    public static readonly IReadOnlyList<string> All =
        new[]
        {
            STRING,
            INT,
            BOOL,
            DECIMAL,
            DATE,
            TIME,
            JSON
        };
}