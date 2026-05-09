using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CiudadesRepository : ICiudadesRepository
{
    private readonly AppDbContext _context;

    public CiudadesRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Ciudades>> GetAllAsync()
    {
        return await _context.Ciudades
            .Include(x => x.Pais)
            .OrderBy(x => x.Nombre)
            .ToListAsync();
    }

    public async Task<Ciudades?> GetByIdAsync(int id)
    {
        return await _context.Ciudades
            .Include(x => x.Pais)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Ciudades>> GetByPaisIdAsync(int paisId)
    {
        return await _context.Ciudades
            .Where(x => x.PaisId == paisId)
            .OrderBy(x => x.Nombre)
            .ToListAsync();
    }

    public async Task<Ciudades> AddAsync(Ciudades ciudad)
    {
        await _context.Ciudades.AddAsync(ciudad);
        await _context.SaveChangesAsync();
        return ciudad;
    }

    public async Task<Ciudades> UpdateAsync(Ciudades ciudad)
    {
        _context.Ciudades.Update(ciudad);
        await _context.SaveChangesAsync();
        return ciudad;
    }

    public async Task<Ciudades?> DeleteAsync(Ciudades ciudad)
    {
        _context.Ciudades.Remove(ciudad);
        await _context.SaveChangesAsync();
        return ciudad;
    }
}