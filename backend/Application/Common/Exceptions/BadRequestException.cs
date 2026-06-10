namespace Application.Common.Exceptions;

/// <summary>
/// Se usa cuando el cliente envía datos inválidos.
/// Ej: campos vacíos, formatos incorrectos, fechas inválidas.
/// HTTP: 400 Bad Request
/// </summary>
public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message) { }
}