using Application.Features.Ciudades.Dto;
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

    public async Task<IEnumerable<Ciudad>> GetAllAsync()
    {
        return await _context.Ciudades
            .Include(x => x.Pais)
            .OrderBy(x => x.Nombre)
            .ToListAsync();
    }

    public async Task<Ciudad?> GetByIdAsync(int id)
    {
        return await _context.Ciudades
            .Include(x => x.Pais)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<CiudadResponse>> GetByPaisNombreAsync(string nombrePais)
    {
        return await _context.Ciudades
            .Where(x => x.Pais.Nombre == nombrePais)
            .OrderBy(x => x.Nombre)
            .Select(x => new CiudadResponse
            {
                Id = x.Id.ToString(),
                Ciudad = x.Nombre,
                Pais = x.Pais.Nombre
            })
            .ToListAsync();
    }

    public async Task<Ciudad> AddAsync(Ciudad ciudad)
    {
        await _context.Ciudades.AddAsync(ciudad);
        await _context.SaveChangesAsync();
        return ciudad;
    }

    public async Task<Ciudad> UpdateAsync(Ciudad ciudad)
    {
        _context.Ciudades.Update(ciudad);
        await _context.SaveChangesAsync();
        return ciudad;
    }

    public async Task<Ciudad?> DeleteAsync(Ciudad ciudad)
    {
        _context.Ciudades.Remove(ciudad);
        await _context.SaveChangesAsync();
        return ciudad;
    }

    public async Task<Ciudad?> GetByNombreAsync(string nombre)
    {
        return await _context.Ciudades
            .AsNoTracking()
            .OrderBy(x => x.Nombre)
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<bool> ExisteCiudadEnPaisAsync(string nombre, int paisId)
    {
        return await _context.Ciudades
            .AnyAsync(c => c.Nombre == nombre && c.PaisId == paisId);
    }

    public async Task<bool> ExisteCiudadDuplicadaAsync(string nombre, int paisId, int id)
    {
        return await _context.Ciudades
            .AnyAsync(c =>
                c.Id != id &&
                c.Nombre == nombre &&
                c.PaisId == paisId
            );
    }
}