using Application.Common.Exceptions;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class CiudadesService : ICiudadesService
{
    private readonly ICiudadesRepository _repository;

    public CiudadesService(ICiudadesRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Ciudades>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Ciudades?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Ciudades>> GetByPaisIdAsync(int paisId)
    {
        return await _repository.GetByPaisIdAsync(paisId);
    }

    public async Task<Ciudades> AddAsync(Ciudades ciudad)
    {
       return  await _repository.AddAsync(ciudad);
    }

    public async Task<Ciudades> UpdateAsync(int id, Ciudades ciudad)
    {
        var existing = await _repository.GetByIdAsync(id);

        if (existing == null)
            throw new BadRequestException("La ciudad no existe");

        existing.Nombre = ciudad.Nombre;
        existing.PaisId = ciudad.PaisId;

        return await _repository.UpdateAsync(existing);
    }

    public async Task<Ciudades?> DeleteAsync(int id)
    {
        var ciudad = await _repository.GetByIdAsync(id);

        if (ciudad == null)
            throw new BadRequestException("La ciudad no existe");

        return await _repository.DeleteAsync(ciudad);
    }
}