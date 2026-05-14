using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

    public async Task<IEnumerable<Ciudades>> GetByPaisNombreAsync(string nombrePais)
    {
        return await _context.Ciudades
            .Where(x => x.Pais.Nombre == nombrePais)
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

    public async Task<Ciudades?> GetByNombreAsync(string nombre)
    {
        return await _context.Ciudades
            .AsNoTracking()
            .OrderBy(x => x.Nombre)
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }
}