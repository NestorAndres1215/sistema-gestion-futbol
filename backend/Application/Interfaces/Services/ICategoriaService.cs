using Application.Dto;
using Domain.Entities;


namespace Application.Interfaces.Services
{
    public interface ICategoriaService
    {
        Task<PagedResult<Categoria>> GetAllAsync(int page, int pageSize, string? search);
        Task<Categoria?> AddAsync(CategoriaDto categoria);
        Task<Categoria?> GetByIdAsync(int id);
        Task<Categoria?> GetByNombreAsync(string nombre);


    }
}
