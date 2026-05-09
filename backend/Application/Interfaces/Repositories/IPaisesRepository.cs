using Domain.Entities;

namespace Domain.Interfaces;

public interface IPaisesRepository
{
    Task<IEnumerable<Paises>> GetAllAsync();
    Task<Paises?> GetByIdAsync(int id);
    Task<Paises?> GetByNombreAsync(string nombre);
    Task<Paises> AddAsync(Paises pais);
    Task<Paises> UpdateAsync(Paises pais);
    Task<Paises> DeleteAsync(Paises pais);
}