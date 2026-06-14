using Microsoft.AspNetCore.Http;
using Application.Common.Exceptions;
using System.Text.Json;
using Application.Common.Models;

namespace API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            switch (ex)
            {
                case BadRequestException:
                case NotFoundException:
                case ConflictException:
                    _logger.LogInformation(ex.Message);
                    break;

                case UnauthorizedException:
                case ForbiddenException:
                    _logger.LogWarning(ex.Message);
                    break;

                default:
                    _logger.LogError(ex, "Unhandled exception occurred");
                    break;
            }

            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";

        var statusCode = ex switch
        {
            BadRequestException => StatusCodes.Status400BadRequest,
            NotFoundException => StatusCodes.Status404NotFound,
            UnauthorizedException => StatusCodes.Status401Unauthorized,
            ForbiddenException => StatusCodes.Status403Forbidden,
            ConflictException => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };

        context.Response.StatusCode = statusCode;

        var response = new ApiErrorResponse
        {
            Status = statusCode,
            Message = statusCode == StatusCodes.Status500InternalServerError
                ? "Error interno del servidor"
                : ex.Message,
            Date = DateTime.UtcNow,
            ErrorType = ex.GetType().Name
        };

        var json = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(json);
    }
}