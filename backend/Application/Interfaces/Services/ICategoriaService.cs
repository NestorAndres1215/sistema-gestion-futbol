using Application.Dto.config;
using Domain.Entities;


namespace Application.Interfaces.Services;

public interface ICategoriaService
{
    Task<List<Categoria>> GetAllAsync();
    Task<Categoria> AddAsync(CategoriaRequest categoria);
    Task<Categoria> GetByIdAsync(int id);
    Task<Categoria> GetByNombreAsync(string nombre);


}

