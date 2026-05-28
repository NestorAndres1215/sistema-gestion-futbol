using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories;

public class EntrenadorSeleccionRepository : IEntrenadorSeleccionRepository
{

    private readonly AppDbContext _context;
    public EntrenadorSeleccionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<EntrenadorSeleccion> AddAsync(EntrenadorSeleccion entrenadorSeleccion)
    {
        _context.EntrenadorSeleccion.Add(entrenadorSeleccion);
        await _context.SaveChangesAsync();
        return entrenadorSeleccion;
    }

    public Task<List<EntrenadorSeleccion>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<List<EntrenadorSeleccion>> GetByCargoAsync(string cargo)
    {
        throw new NotImplementedException();
    }

    public Task<EntrenadorSeleccion?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<EntrenadorSeleccion>> GetBySeleccionAsync(int seleccionId)
    {
        throw new NotImplementedException();
    }

    public async Task<EntrenadorSeleccion> UpdateAsync(EntrenadorSeleccion entrenadorSeleccion)
    {
        _context.EntrenadorSeleccion.Update(entrenadorSeleccion);
        await _context.SaveChangesAsync();
        return entrenadorSeleccion;
    }
}
