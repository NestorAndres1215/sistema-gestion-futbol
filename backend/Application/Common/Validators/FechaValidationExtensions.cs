using FluentValidation;

namespace Application.Common.Validators;

public static class FechaValidationExtensions
{
    // ----------------------------
    // Mayor o igual (DateTime)
    // ----------------------------
    public static IRuleBuilderOptions<T, DateTime> SerMayorOIgualQue<T>(
        this IRuleBuilder<T, DateTime> ruleBuilder,
        Func<T, DateTime> fechaComparacion,
        string mensaje)
    {
        return ruleBuilder
            .Must((model, fecha) => fecha >= fechaComparacion(model))
            .WithMessage(mensaje);
    }

    // ----------------------------
    // Mayor o igual (DateTime?)
    // ----------------------------
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

    // ----------------------------
    // Menor o igual (DateTime?)
    // ----------------------------
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
    public static IRuleBuilderOptions<T, DateTime> SerMenorOIgualQue<T>(
    this IRuleBuilder<T, DateTime> ruleBuilder,
    Func<T, DateTime> fechaComparacion,
    string mensaje)
    {
        return ruleBuilder
            .Must((model, fecha) => fecha <= fechaComparacion(model))
            .WithMessage(mensaje);
    }
    // ----------------------------
    // Edad mínima (DateTime)
    // ----------------------------
    public static IRuleBuilderOptions<T, DateTime> TenerEdadMinima<T>(
        this IRuleBuilder<T, DateTime> ruleBuilder,
        Func<T, DateTime> fechaNacimiento,
        int edadMinima,
        string mensaje)
    {
        return ruleBuilder
            .Must((model, fechaEvento) =>
            {
                var nacimiento = fechaNacimiento(model);

                var edad = fechaEvento.Year - nacimiento.Year;

                if (fechaEvento < nacimiento.AddYears(edad))
                    edad--;

                return edad >= edadMinima;
            })
            .WithMessage(mensaje);
    }
}