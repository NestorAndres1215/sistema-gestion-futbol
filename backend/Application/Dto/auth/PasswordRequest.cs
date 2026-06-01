namespace Application.Dto.auth;

public class PasswordRequest
{
    public required string PasswordActual { get; set; } = string.Empty;
    public required string PasswordNueva { get; set; } = string.Empty;
    public required string PasswordConfirmacion {  get; set; } = string.Empty;
}
