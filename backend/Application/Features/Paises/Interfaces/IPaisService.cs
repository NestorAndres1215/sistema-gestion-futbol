using Domain.Entities;

namespace Application.Features.Paises.Interfaces;

public interface IPaisService
{
    Task<IEnumerable<Pais>> GetAllAsync();

    Task<Pais?> GetByIdAsync(int id);
    Task<Pais?> GetByNombreAsync(string nombre);

    Task<Pais> AddAsync(Pais pais);

    Task<Pais> UpdateAsync(Pais pais);

    Task<Pais?> DeleteAsync(int id);
}