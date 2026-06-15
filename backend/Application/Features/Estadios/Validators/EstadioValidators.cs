using Application.Features.Estadios.Dto;
using Domain.Catalogs;
using FluentValidation;

namespace Application.Features.Estadios.Validators;

public class EstadioValidators: AbstractValidator<EstadioRequest>
{
    public EstadioValidators() {

        RuleFor(x => x.Nombre)
                   .NotEmpty().WithMessage("El nombre es obligatorio.")
                   .MaximumLength(100);

        RuleFor(x => x.Descripcion)
            .MaximumLength(500);

        RuleFor(x => x.Ciudad)
            .NotEmpty().WithMessage("La ciudad es obligatoria.")
            .MaximumLength(100);

        RuleFor(x => x.Pais)
            .NotEmpty().WithMessage("El país es obligatorio.")
            .MaximumLength(100);

        RuleFor(x => x.Capacidad)
            .GreaterThan(0)
            .WithMessage("La capacidad debe ser mayor a 0.");

        RuleFor(x => x.FechaApertura)
            .LessThanOrEqualTo(DateTime.UtcNow)
            .When(x => x.FechaApertura.HasValue)
            .WithMessage("La fecha de apertura no puede ser futura.");

        RuleFor(x => x.Anio)
            .Must(BeConsistentYear)
            .WithMessage("El año debe coincidir con la fecha de apertura.");

        RuleFor(x => x.Latitud)
            .InclusiveBetween(-90, 90)
            .When(x => x.Latitud.HasValue);

        RuleFor(x => x.Longitud)
            .InclusiveBetween(-180, 180)
            .When(x => x.Longitud.HasValue);

        RuleFor(x => x.TipoCesped)
            .NotEmpty().WithMessage("El tipo de césped es obligatorio.")
            .Must(tipo => TipoCesped.All.Contains(tipo))
            .WithMessage("Tipo de césped inválido.");


    }

    private bool BeConsistentYear(EstadioRequest dto, int? anio)
    {
        if (!anio.HasValue || !dto.FechaApertura.HasValue)
            return true;

        return anio.Value == dto.FechaApertura.Value.Year;
    }
}
