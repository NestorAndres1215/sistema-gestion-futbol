using Application.Features.Auth.Dto;
using FluentValidation;

namespace Application.Features.Auth.Validators;

public class PasswordValidators : AbstractValidator<PasswordRequest>
{
    public PasswordValidators()
    {
        // =========================
        // PASSWORD ACTUAL
        // =========================
        RuleFor(x => x.PasswordActual)
            .NotEmpty()
            .WithMessage("La contraseña actual es obligatoria.");

        // =========================
        // NUEVA PASSWORD
        // =========================
        RuleFor(x => x.PasswordNueva)
            .NotEmpty()
            .WithMessage("La nueva contraseña es obligatoria.")
            .MinimumLength(6)
            .WithMessage("Debe tener al menos 6 caracteres.")
            .Must(ContieneLetra)
            .WithMessage("Debe contener al menos una letra.")
            .Must(ContieneNumero)
            .WithMessage("Debe contener al menos un número.")
            .NotEqual(x => x.PasswordActual)
            .WithMessage("La nueva contraseña no puede ser igual a la actual.");

        // =========================
        // CONFIRMACIÓN
        // =========================
        RuleFor(x => x.PasswordConfirmacion)
            .NotEmpty()
            .WithMessage("La confirmación es obligatoria.")
            .Equal(x => x.PasswordNueva)
            .WithMessage("La confirmación de contraseña no coincide.");
    }

    // =========================
    // HELPERS
    // =========================
    private bool ContieneLetra(string password)
    {
        return !string.IsNullOrWhiteSpace(password) &&
               password.Any(char.IsLetter);
    }

    private bool ContieneNumero(string password)
    {
        return !string.IsNullOrWhiteSpace(password) &&
               password.Any(char.IsDigit);
    }
}