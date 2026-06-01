namespace Application.Dto.auth;

public class UsuarioRequest
{
    public required string Username { get; set; }

    public required string Email { get; set; }

    public required string Estado { get; set; }

    public required string Rol { get; set; }

}

