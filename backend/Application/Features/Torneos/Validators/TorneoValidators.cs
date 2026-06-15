
using Application.Features.Torneos.Dto;
using Domain.Catalogs;
using FluentValidation;
using System;

namespace Application.Features.Torneos.Validators;

public class TorneoValidators : AbstractValidator<TorneoRequest>
{
    public TorneoValidators()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio.")
            .MaximumLength(100);

        RuleFor(x => x.Tipo)
            .NotEmpty().WithMessage("El tipo es obligatorio.")
            .Must(tipo => TipoTorneo.All.Contains(tipo))
            .WithMessage("Tipo de torneo inválido.");

        RuleFor(x => x.Creado)
            .NotEmpty().WithMessage("El creador es obligatorio.");

        RuleFor(x => x.Descripcion)
            .MaximumLength(500)
            .When(x => !string.IsNullOrEmpty(x.Descripcion));
    }
}