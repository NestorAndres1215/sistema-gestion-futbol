namespace Application.Common.Services;

public interface IJwtTokenGenerator
{
    string GenerateToken(int userId, string email, string role);
}