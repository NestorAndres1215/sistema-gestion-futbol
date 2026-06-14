using Application.Common.Exceptions;
using FluentValidation;

namespace Application.Common.Helpers;

public static class ValidationHelper
{
    public static void Validar<T>(T dto, IValidator<T> validator)
    {
        var result = validator.Validate(dto);

        if (!result.IsValid)
        {
            var errores = string.Join(
                Environment.NewLine,
                result.Errors.Select(e => e.ErrorMessage));

            throw new BadRequestException(errores);
        }
    }
}
