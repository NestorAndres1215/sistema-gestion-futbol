using Application.Features.Auth.Dto;
using FluentValidation;

namespace Application.Features.Auth.Validators;

public class RegistroUsuarioValidators : AbstractValidator<RegisterUsuarioRequest>
{

    public RegistroUsuarioValidators()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("El username es obligatorio.")
            .MinimumLength(3)
            .WithMessage("El username debe tener al menos 3 caracteres.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("El email no es válido.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("La contraseña es obligatoria.")
            .MinimumLength(8)
            .WithMessage("Debe tener al menos 8 caracteres.")
            .Must(p => p.Any(char.IsLetter))
            .WithMessage("Debe incluir al menos una letra.")
            .Must(p => p.Any(char.IsDigit))
            .WithMessage("Debe incluir al menos un número.");

    }
}
