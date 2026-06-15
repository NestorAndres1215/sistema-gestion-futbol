using Application.Common.Exceptions;
using Application.Features.Categorias;
using Application.Features.Categorias.Dto;
using Application.Features.Categorias.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Entities;


namespace Application.Features.Categorias.Services;
public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _repo;

    public CategoriaService(ICategoriaRepository repo)
    {
        _repo = repo;
    }

    public async Task<Categoria> AddAsync(CategoriaRequest categoriaDto)
    {

        var existe = await _repo.GetByNombreAsync(categoriaDto.nombre);
        if (existe != null)
            throw new ConflictException("La categoría ya existe");

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
        return await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Categoría no encontrada");
    }

    public async Task<Categoria> GetByNombreAsync(string nombre)
    {
        return await _repo.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Categoría no encontrada");
    }
}

