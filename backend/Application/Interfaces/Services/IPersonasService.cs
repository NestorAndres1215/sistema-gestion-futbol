
using Application.Dto;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface IPersonasService
{
    Task<Personas> AddAsync(Personas personas );
    Task<Personas> UpdateAsync(Personas personas);
    Task<Personas?> GetByIdAsync(int id);
    Task<Personas?> GetByNombreAsync(string nombre);

    Task<Personas?> GetByNombreCompletoAsync(
        string nombre,
        string apellido
    );
}
