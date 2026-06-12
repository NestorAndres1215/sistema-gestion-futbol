namespace Application.Features.ClubesEstadios.Dto;

public class ClubesEstadioResponse
{
    public int Id { get; set; }

    public string Clubes { get; set; } = string.Empty;

    public string Estadio { get; set; } = string.Empty;

    public string Ciudad { get; set; } = string.Empty;

    public int Capacidad { get; set; }

    public string Tipo { get; set; } = string.Empty;
}
