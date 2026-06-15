
using Application.Features.Usuarios.Dto;
using FluentValidation;


namespace Application.Features.Usuarios.Validators;

public class UsuarioValidators : AbstractValidator<UsuarioRequest>
{
    public UsuarioValidators()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("El username es obligatorio.")
            .MinimumLength(3).WithMessage("El username debe tener al menos 3 caracteres.")
            .MaximumLength(50).WithMessage("El username no puede superar 50 caracteres.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("El email es obligatorio.")
            .EmailAddress().WithMessage("El formato del email no es válido.")
            .MaximumLength(100).WithMessage("El email no puede superar 100 caracteres.");
    }
}