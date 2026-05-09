using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class PaisesService : IPaisesService
{
    private readonly IPaisesRepository _repository;

    public PaisesService(IPaisesRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Paises>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Paises?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Paises> AddAsync(Paises pais)
    {
        return await _repository.AddAsync(pais);

    }

    public async Task<Paises> UpdateAsync(Paises pais)
    {
        return await _repository.UpdateAsync(pais);
    }

    public async Task<Paises?> DeleteAsync(int id)
    {
        var pais = await _repository.GetByIdAsync(id);

        if (pais is null)
            return null;

        return await _repository.DeleteAsync(pais);
    }
}