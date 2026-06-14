using Application.Common.Validators;
using Application.Features.Arbitros.Dto;
using Domain.Constants;
using FluentValidation;

namespace Application.Features.Arbitros.Validators;

public class ArbitrosValidator : AbstractValidator<ArbitrosRequest>
{
    public ArbitrosValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio.");

        RuleFor(x => x.Apellido)
            .NotEmpty().WithMessage("El apellido es obligatorio.");

        RuleFor(x => x.FechaDebut)
            .SerMayorOIgualQue(
                x => x.FechaNacimiento,
                "La fecha de debut no puede ser menor a la fecha de nacimiento.");

        RuleFor(x => x.FechaDebut)
            .TenerEdadMinima(
                x => x.FechaNacimiento,
                18,
                "El árbitro debe tener al menos 18 años al momento de debutar.");

        RuleFor(x => x.FechaDebut)
            .SerMenorOIgualQue(
                x => x.FechaRetiro,
                "La fecha de debut no puede ser mayor a la fecha de retiro.");

        RuleFor(x => x.FechaRetiro)
            .SerMayorOIgualQue(
                x => x.FechaNacimiento,
                "La fecha de retiro no puede ser menor a la fecha de nacimiento.");

        RuleFor(x => x.FechaRetiro)
            .SerMayorOIgualQue(
                x => x.FechaDebut,
                "La fecha de retiro no puede ser menor a la fecha de debut.");

        RuleFor(x => x.PaisNacimiento)
            .NotEmpty().WithMessage("El país es obligatorio.");

        RuleFor(x => x.CiudadNacimiento)
            .NotEmpty().WithMessage("La ciudad es obligatoria.");

        RuleFor(x => x.Genero)
            .NotEmpty().WithMessage("El género es obligatorio.")
            .EsGeneroValido();

        RuleFor(x => x.RolArbitral)
            .NotEmpty()
            .Must(x => EspecialidadArbitro.All.Contains(x))
            .WithMessage("El rol arbitral debe ser Principal, VAR o Asistente.");

        RuleFor(x => x.Categoria)
            .NotEmpty()
            .Must(x => CategoriaArbitro.All.Contains(x))
            .WithMessage("La categoría debe ser FIFA, Nacional o Regional.");

        RuleFor(x => x.Nivel)
            .InclusiveBetween(0, 100)
            .WithMessage("El nivel debe estar entre 0 y 100.")
            .Must(x => x % 5 == 0)
            .WithMessage("El nivel debe ser múltiplo de 5.");

        RuleFor(x => x.Reputacion)
            .InclusiveBetween(0, 100)
            .WithMessage("La reputación debe estar entre 0 y 100.")
            .Must(x => x % 5 == 0)
            .WithMessage("La reputación debe ser múltiplo de 5.");

        RuleFor(x => x.PrecisionDecisiones)
            .InclusiveBetween(0, 100)
            .WithMessage("La precisión de decisiones debe estar entre 0 y 100.")
            .Must(x => x % 5 == 0)
            .WithMessage("La precisión de decisiones debe ser múltiplo de 5.");
    }
}