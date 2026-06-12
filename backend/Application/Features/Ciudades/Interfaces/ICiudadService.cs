using Application.Features.Ciudades.Dto;
using Domain.Entities;

namespace Application.Features.Ciudades.Interfaces;

public interface ICiudadService
{
    Task<IEnumerable<Ciudad>> GetAllAsync();

    Task<Ciudad?> GetByIdAsync(int id);

    Task<IEnumerable<CiudadResponse>> GetByPaisNombreAsync(string nombrePais);

    Task<Ciudad> AddAsync(Ciudad ciudad);

    Task<Ciudad> UpdateAsync(int id, Ciudad ciudad);

    Task<Ciudad?> DeleteAsync(int id);
}