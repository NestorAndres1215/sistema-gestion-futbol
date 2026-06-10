namespace Application.Common.Exceptions;

/// <summary>
/// Se usa para errores internos del servidor.
/// Ej: errores de base de datos, fallos inesperados.
/// HTTP: 500 Internal Server Error
/// </summary>
public class ServerException : Exception
{
    public ServerException(string message) : base(message) { }
}