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

    public async Task<IEnumerable<Pais>> GetAllAsync()
    {
        return await _context.Paises
            .OrderBy(x => x.Nombre)
            .ToListAsync();
    }

    public async Task<Pais?> GetByIdAsync(int id)
    {
        return await _context.Paises
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Pais> AddAsync(Pais pais)
    {
        await _context.Paises.AddAsync(pais);
        await _context.SaveChangesAsync();
        return pais;
    }

    public async Task<Pais> UpdateAsync(Pais pais)
    {
        _context.Paises.Update(pais);
        await _context.SaveChangesAsync();
        return pais;
    }

    public async Task<Pais> DeleteAsync(Pais pais)
    {
        _context.Paises.Remove(pais);
        await _context.SaveChangesAsync();
        return pais;
    }

    public async  Task<Pais?> GetByNombreAsync(string nombre)
    {
        return await _context.Paises
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }
}