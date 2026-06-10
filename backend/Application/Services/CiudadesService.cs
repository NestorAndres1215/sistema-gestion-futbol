using Application.Common.Exceptions;
using Application.Dto.Config;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class CiudadesService : ICiudadesService
{
    private readonly ICiudadesRepository _repository;
    private readonly IPaisesRepository _paisRepository;

    public CiudadesService(
        IPaisesRepository paisRepository,
        ICiudadesRepository repository)
    {
        _repository = repository;
        _paisRepository = paisRepository;
    }

    public async Task<IEnumerable<Ciudades>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Ciudades?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<CiudadResponse>> GetByPaisNombreAsync(string nombrePais)
    {
        return await _repository.GetByPaisNombreAsync(nombrePais);
    }

    public async Task<Ciudades> AddAsync(Ciudades ciudad)
    {
        var paisExiste = await _paisRepository.GetByIdAsync(ciudad.PaisId);

        if (paisExiste == null)
            throw new BadRequestException("El país no existe");

        var existe = await _repository
            .ExisteCiudadEnPaisAsync(ciudad.Nombre, ciudad.PaisId);

        if (existe)
            throw new BadRequestException("Ya existe una ciudad con ese nombre en ese país");

        return await _repository.AddAsync(ciudad);
    }

    public async Task<Ciudades> UpdateAsync(int id, Ciudades ciudad)
    {
        var existing = await _repository.GetByIdAsync(id);

        if (existing == null)
            throw new BadRequestException("La ciudad no existe");

        var paisExiste = await _paisRepository.GetByIdAsync(ciudad.PaisId);

        if (paisExiste == null)
            throw new BadRequestException("El país no existe");


        var existe = await _repository
            .ExisteCiudadDuplicadaAsync(ciudad.Nombre, ciudad.PaisId, id);

        if (existe)
            throw new BadRequestException("Ya existe una ciudad con ese nombre en ese país");

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