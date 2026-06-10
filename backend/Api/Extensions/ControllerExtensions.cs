using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace Api.Extensions;

public static class ControllerExtensions
{
    public static IServiceCollection AddApiControllers(
        this IServiceCollection services)
    {
        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler =
                    ReferenceHandler.IgnoreCycles;
            });

        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });

        return services;
    }
}
