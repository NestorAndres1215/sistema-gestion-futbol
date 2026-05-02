namespace Application.Common.Models;

public class ApiErrorDto
{
    public string Message { get; set; }
    public int Status { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
}