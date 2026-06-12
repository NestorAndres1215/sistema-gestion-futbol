
using Domain.Entities;

namespace Application.Features.Personas.Interfaces;

public interface IPersonasService
{
    Task<Persona> AddAsync(Persona personas );
    Task<Persona> UpdateAsync(Persona personas);
    Task<Persona?> GetByIdAsync(int id);
    Task<Persona?> GetByNombreAsync(string nombre);
    Task<Persona?> GetByNombreCompletoAsync( string nombre, string apellido);
}
