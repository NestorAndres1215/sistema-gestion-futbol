using Application.Dto.Config;
using Domain.Entities;

namespace Application.Services;

public interface ICiudadesService
{
    Task<IEnumerable<Ciudades>> GetAllAsync();

    Task<Ciudades?> GetByIdAsync(int id);

    Task<IEnumerable<CiudadResponse>> GetByPaisNombreAsync(string nombrePais);

    Task<Ciudades> AddAsync(Ciudades ciudad);

    Task<Ciudades> UpdateAsync(int id, Ciudades ciudad);

    Task<Ciudades?> DeleteAsync(int id);
}