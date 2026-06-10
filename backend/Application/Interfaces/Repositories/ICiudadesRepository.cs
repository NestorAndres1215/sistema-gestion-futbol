using Application.Dto.Config;
using Domain.Entities;

namespace Domain.Interfaces;

public interface ICiudadesRepository
{
    Task<IEnumerable<Ciudades>> GetAllAsync();

    Task<Ciudades?> GetByIdAsync(int id);
    Task<Ciudades?> GetByNombreAsync(string nombre);

    Task<IEnumerable<CiudadResponse>> GetByPaisNombreAsync(string nombrePais);

    Task<Ciudades> AddAsync(Ciudades ciudad);

    Task<Ciudades> UpdateAsync(Ciudades ciudad);

    Task<Ciudades?> DeleteAsync(Ciudades ciudad);
    Task<bool> ExisteCiudadEnPaisAsync(string nombre, int paisId);
    Task<bool> ExisteCiudadDuplicadaAsync(string nombre, int paisId, int id);
}