using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class PaisesRepository : IPaisesRepository
{
    private readonly AppDbContext _context;

    public PaisesRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Paises>> GetAllAsync()
    {
        return await _context.Paises
            .OrderBy(x => x.Nombre)
            .ToListAsync();
    }

    public async Task<Paises?> GetByIdAsync(int id)
    {
        return await _context.Paises
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Paises> AddAsync(Paises pais)
    {
        await _context.Paises.AddAsync(pais);
        await _context.SaveChangesAsync();
        return pais;
    }

    public async Task<Paises> UpdateAsync(Paises pais)
    {
        _context.Paises.Update(pais);
        await _context.SaveChangesAsync();
        return pais;
    }

    public async Task<Paises> DeleteAsync(Paises pais)
    {
        _context.Paises.Remove(pais);
        await _context.SaveChangesAsync();
        return pais;
    }

    public async  Task<Paises?> GetByNombreAsync(string nombre)
    {
        return await _context.Paises
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }
}