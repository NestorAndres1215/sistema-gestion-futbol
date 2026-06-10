namespace Application.Common.Exceptions;

/// <summary>
/// Se usa cuando el usuario no está autenticado.
/// Ej: token inválido o no enviado.
/// HTTP: 401 Unauthorized
/// </summary>
public class UnauthorizedException : Exception
{
    public UnauthorizedException(string message) : base(message) { }
}