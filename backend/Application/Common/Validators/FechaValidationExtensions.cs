using FluentValidation;

namespace Application.Common.Validators;

public static class FechaValidationExtensions
{
    public static IRuleBuilderOptions<T, DateTime?> SerMayorOIgualQue<T>(
        this IRuleBuilder<T, DateTime?> ruleBuilder,
        Func<T, DateTime> fechaComparacion,
        string mensaje)
    {
        return ruleBuilder
            .Must((model, fecha) =>
                !fecha.HasValue ||
                fecha.Value >= fechaComparacion(model))
            .WithMessage(mensaje);
    }

    public static IRuleBuilderOptions<T, DateTime?> SerMayorOIgualQue<T>(
        this IRuleBuilder<T, DateTime?> ruleBuilder,
        Func<T, DateTime?> fechaComparacion,
        string mensaje)
    {
        return ruleBuilder
            .Must((model, fecha) =>
                !fecha.HasValue ||
                !fechaComparacion(model).HasValue ||
                fecha.Value >= fechaComparacion(model)!.Value)
            .WithMessage(mensaje);
    }

    public static IRuleBuilderOptions<T, DateTime?> SerMenorOIgualQue<T>(
        this IRuleBuilder<T, DateTime?> ruleBuilder,
        Func<T, DateTime?> fechaComparacion,
        string mensaje)
    {
        return ruleBuilder
            .Must((model, fecha) =>
                !fecha.HasValue ||
                !fechaComparacion(model).HasValue ||
                fecha.Value <= fechaComparacion(model)!.Value)
            .WithMessage(mensaje);
    }

    public static IRuleBuilderOptions<T, DateTime?> TenerEdadMinima<T>(
        this IRuleBuilder<T, DateTime?> ruleBuilder,
        Func<T, DateTime> fechaNacimiento,
        int edadMinima,
        string mensaje)
    {
        return ruleBuilder
            .Must((model, fecha) =>
                !fecha.HasValue ||
                fecha.Value >= fechaNacimiento(model).AddYears(edadMinima))
            .WithMessage(mensaje);
    }
}