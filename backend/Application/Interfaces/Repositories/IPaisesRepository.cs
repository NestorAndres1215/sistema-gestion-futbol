using Domain.Entities;

namespace Domain.Interfaces;

public interface IPaisesRepository
{
    Task<IEnumerable<Pais>> GetAllAsync();
    Task<Pais?> GetByIdAsync(int id);
    Task<Pais?> GetByNombreAsync(string nombre);
    Task<Pais> AddAsync(Pais pais);
    Task<Pais> UpdateAsync(Pais pais);
    Task<Pais> DeleteAsync(Pais pais);
}