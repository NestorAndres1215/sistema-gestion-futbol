using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;


namespace Application.Services;
public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _repo;

    public CategoriaService(ICategoriaRepository repo)
    {
        _repo = repo;
    }

    public async Task<Categoria> AddAsync(CategoriaDto categoriaDto)
    {

        var existe = await _repo.GetByNombreAsync(categoriaDto.nombre);
        if (existe != null)
            throw new BadRequestException("La categoría ya existe");

        var entity = new Categoria
        {
            Nombre = categoriaDto.nombre,
            Descripcion = categoriaDto.descripcion,
        };

        return await _repo.AddAsync(entity);
    }

    public async Task<List<Categoria>> GetAllAsync()
    {
        return await _repo.GetAllAsync();
    }

    public async Task<Categoria> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task<Categoria> GetByNombreAsync(string nombre)
    {
        return await _repo.GetByNombreAsync(nombre);
    }

}

