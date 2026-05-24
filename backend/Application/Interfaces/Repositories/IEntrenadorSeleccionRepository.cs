using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEntrenadorSeleccionRepository
{
    Task<List<EntrenadorSeleccion>> GetAllAsync();
    Task<EntrenadorSeleccion> AddAsync(Categoria categoria);
    Task<EntrenadorSeleccion> UpdateAsync(Categoria categoria);
    Task<EntrenadorSeleccion?> GetByIdAsync(int id);
    Task<List<EntrenadorSeleccion>> GetBySeleccionAsync(int seleccionId);
    Task<List<EntrenadorSeleccion>> GetByCargoAsync(string cargo);
}
