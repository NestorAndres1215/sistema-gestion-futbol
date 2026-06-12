using Application.Features.Ciudades.Dto;
using Domain.Entities;

namespace Domain.Interfaces;

public interface ICiudadesRepository
{
    Task<IEnumerable<Ciudad>> GetAllAsync();

    Task<Ciudad?> GetByIdAsync(int id);
    Task<Ciudad?> GetByNombreAsync(string nombre);

    Task<IEnumerable<CiudadResponse>> GetByPaisNombreAsync(string nombrePais);

    Task<Ciudad> AddAsync(Ciudad ciudad);

    Task<Ciudad> UpdateAsync(Ciudad ciudad);

    Task<Ciudad?> DeleteAsync(Ciudad ciudad);
    Task<bool> ExisteCiudadEnPaisAsync(string nombre, int paisId);
    Task<bool> ExisteCiudadDuplicadaAsync(string nombre, int paisId, int id);
}