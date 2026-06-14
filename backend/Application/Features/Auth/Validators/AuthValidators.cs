using Application.Features.Auth.Dto;
using FluentValidation;

namespace Application.Features.Auth.Validators;

public class AuthValidators : AbstractValidator<LoginRequest>
{
    public AuthValidators()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("El correo es obligatorio.")
            .EmailAddress()
            .WithMessage("El correo no tiene un formato válido.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("La contraseña es obligatoria.");
    }
}