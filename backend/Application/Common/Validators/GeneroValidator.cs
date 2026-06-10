using Domain.Constants;
using FluentValidation;

namespace Application.Common.Validators;

public static class GeneroValidator
{
    private static readonly HashSet<string> GenerosValidos = new()
    {
        Genero.Masculino,
        Genero.Femenino,
        Genero.Mixto
    };

    public static string Validar(string genero)
    {
        if (string.IsNullOrWhiteSpace(genero))
            throw new ValidationException("El género es obligatorio.");

        genero = genero.Trim();

        var generoValido = GenerosValidos
            .FirstOrDefault(x =>
                x.Equals(genero, StringComparison.OrdinalIgnoreCase));

        if (generoValido is null)
            throw new ValidationException(
                "El género debe ser Masculino, Femenino o Mixto.");

        return generoValido;
    }
}