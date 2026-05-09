using Domain.Entities;

namespace Domain.Interfaces;

public interface ICiudadesRepository
{
    Task<IEnumerable<Ciudades>> GetAllAsync();

    Task<Ciudades?> GetByIdAsync(int id);

    Task<IEnumerable<Ciudades>> GetByPaisIdAsync(int paisId);

    Task<Ciudades> AddAsync(Ciudades ciudad);

    Task<Ciudades> UpdateAsync(Ciudades ciudad);

    Task<Ciudades?> DeleteAsync(Ciudades ciudad);
}