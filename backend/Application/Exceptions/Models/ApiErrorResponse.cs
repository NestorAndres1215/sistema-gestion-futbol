namespace Application.Common.Models;

public class ApiErrorResponse
{
    public string? Message { get; set; }
    public int Status { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
}