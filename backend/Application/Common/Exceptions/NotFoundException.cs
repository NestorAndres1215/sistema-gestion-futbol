namespace Application.Common.Exceptions;

/// <summary>
/// Se usa cuando no existe el recurso solicitado.
/// Ej: país, ciudad, jugador no encontrado.
/// HTTP: 404 Not Found
/// </summary>
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}