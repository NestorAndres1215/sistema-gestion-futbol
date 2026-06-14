using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Validators;

public static class DateValidationExtensions
{
    public static IRuleBuilderOptions<T, DateTime> MayorDeEdad<T>(
       this IRuleBuilder<T, DateTime> ruleBuilder)
    {
        return ruleBuilder.Must(fechaNacimiento =>
        {
            var hoy = DateTime.Today;
            var edad = hoy.Year - fechaNacimiento.Year;

            if (fechaNacimiento.Date > hoy.AddYears(-edad))
                edad--;

            return edad >= 18;
        })
        .WithMessage("Debe ser mayor de edad.");
    }
}
