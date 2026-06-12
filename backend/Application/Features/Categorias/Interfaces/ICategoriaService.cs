using Application.Features.Categorias.Dto;
using Domain.Entities;

namespace Application.Features.Categorias.Interfaces;

public interface ICategoriaService
{
    Task<List<Categoria>> GetAllAsync();
    Task<Categoria> AddAsync(CategoriaRequest categoria);
    Task<Categoria> GetByIdAsync(int id);
    Task<Categoria> GetByNombreAsync(string nombre);

}

