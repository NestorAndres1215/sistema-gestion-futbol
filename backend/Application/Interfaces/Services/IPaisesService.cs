using Domain.Entities;

namespace Application.Services;

public interface IPaisesService
{
    Task<IEnumerable<Paises>> GetAllAsync();

    Task<Paises?> GetByIdAsync(int id);

    Task<Paises> AddAsync(Paises pais);

    Task<Paises> UpdateAsync(Paises pais);

    Task<Paises?> DeleteAsync(int id);
}