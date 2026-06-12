using Application.Common.Exceptions;
using Application.Features.Paises.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Features.Paises.Services;

public class PaisService : IPaisService
{
    private readonly IPaisesRepository _repository;

    public PaisService(IPaisesRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Pais>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Pais?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Pais no encontrado");
    }

    public async Task<Pais> AddAsync(Pais pais)
    {
        ValidatePais(pais);

        var existing = await _repository.GetByNombreAsync(pais.Nombre);

        if (existing != null)
            throw new BadRequestException("El país ya existe");

        return await _repository.AddAsync(pais);
    }

    public async Task<Pais> UpdateAsync(Pais pais)
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


    public async Task<Pais?> DeleteAsync(int id)
    {
        var pais = await _repository.GetByIdAsync(id);

        if (pais is null)
            return null;

        return await _repository.DeleteAsync(pais);
    }

    public async Task<Pais?> GetByNombreAsync(string nombre)
    {
        return await _repository.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Pais no encontrado");
    }

    private void ValidatePais(Pais pais)
    {
        if (pais == null)
            throw new BadRequestException("País inválido");

        if (string.IsNullOrWhiteSpace(pais.Nombre))
            throw new BadRequestException("El nombre del país es obligatorio");

        if (pais.Nombre.Length < 2)
            throw new BadRequestException("El nombre del país es muy corto");
    }
}