using Domain.Entities;
using Domain.Enums;

namespace Application.Interfaces.Repositories;

public interface IUsuarioRepository
{
    Task<Usuario> GetByEmailAsync(string email);

    Task<Usuario> GetByIdAsync(int id);

    Task<List<Usuario>> GetAllAsync();

    Task AddAsync(Usuario user);

    Task UpdateAsync(Usuario user);

    Task UpdateEstadoAsync(int id, Estado estado);
}