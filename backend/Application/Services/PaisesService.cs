using Application.Common.Exceptions;
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
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Pais no encontrado");
    }

    public async Task<Paises> AddAsync(Paises pais)
    {
        ValidatePais(pais);

        var existing = await _repository.GetByNombreAsync(pais.Nombre);

        if (existing != null)
            throw new BadRequestException("El país ya existe");

        return await _repository.AddAsync(pais);
    }

    public async Task<Paises> UpdateAsync(Paises pais)
    {
        ValidatePais(pais);

        var existing = await _repository.GetByIdAsync(pais.Id);

        if (existing is null)
            throw new NotFoundException("País no encontrado");

        var duplicate = await _repository.GetByNombreAsync(pais.Nombre);

        if (duplicate != null && duplicate.Id != pais.Id)
            throw new BadRequestException("Ya existe otro país con ese nombre");

        return await _repository.UpdateAsync(pais);
    }


    public async Task<Paises?> DeleteAsync(int id)
    {
        var pais = await _repository.GetByIdAsync(id);

        if (pais is null)
            return null;

        return await _repository.DeleteAsync(pais);
    }

    public async Task<Paises?> GetByNombreAsync(string nombre)
    {
        return await _repository.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Pais no encontrado");
    }

    private void ValidatePais(Paises pais)
    {
        if (pais == null)
            throw new BadRequestException("País inválido");

        if (string.IsNullOrWhiteSpace(pais.Nombre))
            throw new BadRequestException("El nombre del país es obligatorio");

        if (pais.Nombre.Length < 2)
            throw new BadRequestException("El nombre del país es muy corto");
    }
}