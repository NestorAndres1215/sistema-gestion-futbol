namespace Application.Common.Exceptions;

/// <summary>
/// Se usa cuando hay conflicto con los datos.
/// Ej: registros duplicados, reglas de negocio violadas.
/// HTTP: 409 Conflict
/// </summary>
public class ConflictException : Exception
{
    public ConflictException(string message) : base(message) { }
}