namespace Application.Common.Exceptions;

/// <summary>
/// Se usa cuando el usuario está autenticado pero no tiene permisos.
/// Ej: usuario normal intentando acciones de admin.
/// HTTP: 403 Forbidden
/// </summary>
public class ForbiddenException : Exception
{
    public ForbiddenException(string message) : base(message) { }
}