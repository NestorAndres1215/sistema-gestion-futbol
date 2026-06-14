using Domain.Catalogs;
using FluentValidation;

namespace Application.Common.Validators;

public static class GeneroValidationExtensions
{
    public static IRuleBuilderOptions<T, string> EsGeneroValido<T>(
        this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
            .NotEmpty().WithMessage("El género es obligatorio.")
            .Must(BeValidGenero)
            .WithMessage("El género debe ser Masculino, Femenino o Mixto.");
    }

    private static bool BeValidGenero(string genero)
    {
        if (string.IsNullOrWhiteSpace(genero))
            return false;

        return Generos.All.Contains(genero.Trim());
    }
}