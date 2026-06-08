namespace Application.Dto.Auth;

public class RegisterUsuarioRequest
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}
