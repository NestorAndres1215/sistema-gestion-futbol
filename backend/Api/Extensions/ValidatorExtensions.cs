using Application.Features.Arbitros.Validators;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Extensions;

public static class ValidatorExtensions
{
    public static IServiceCollection AddValidators(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<ArbitrosValidator>();
        return services;
    }
}