
using Domain.Entities;


namespace Application.Interfaces.Repositories
{
    public  interface ICategoriaRepository
    {
        Task<List<Categoria>> GetAllAsync();
        Task<Categoria> AddAsync(Categoria categoria);
        Task<Categoria?> GetByIdAsync(int id);
        Task<Categoria?> GetByNombreAsync(string nombre);
    }
}
