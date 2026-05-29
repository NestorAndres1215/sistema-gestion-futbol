namespace Application.Dto.auth;

public class PasswordRequest
{
    public string PasswordActual { get; set; } = string.Empty;
    public string PasswordNueva { get; set; } = string.Empty;
    public string PasswordConfirmacion {  get; set; } = string.Empty;
}
