using Application.Dto.config;
using Application.Dto.entrenadores;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EntrenadoresRepository : IEntrenadoresRepository
{

    private readonly AppDbContext _context;
    public EntrenadoresRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Entrenadores> AddAsync(Entrenadores entrenadores)
    {
        _context.Entrenadores.Add(entrenadores);
        await _context.SaveChangesAsync();
        return entrenadores;
    }

    public async Task<PagedResult<Entrenadores>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? estiloJuego,
        string? pais,
        string? estado)
    {
        var query = _context.Entrenadores
            .Include(e => e.Persona)
                .ThenInclude(p => p.PaisNacimiento)
            .Include(e => e.Persona)
                .ThenInclude(p => p.CiudadNacimiento)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(e =>
                e.Persona != null &&
                (
                    e.Persona.Nombre.Contains(search) ||
                    e.Persona.Apellido.Contains(search) 
                )
            );
        }

        if (!string.IsNullOrWhiteSpace(estiloJuego))
        {
            query = query.Where(e =>
                e.EstiloJuego != null &&
                e.EstiloJuego.Contains(estiloJuego)
            );
        }

        if (!string.IsNullOrWhiteSpace(pais))
        {
            query = query.Where(e =>
                e.Persona != null &&
                e.Persona.PaisNacimiento != null &&
                e.Persona.PaisNacimiento.Nombre.Contains(pais)
            );
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            query = query.Where(e => e.Estado == estado);
        }

        var total = await query.CountAsync();

        var data = await query
            .OrderByDescending(e => e.Nivel)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Entrenadores>
        {
            Items = data,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Entrenadores?> GetByIdAsync(int id)
    {
        return await _context.Entrenadores
            .Include(x => x.Persona)
                .ThenInclude(p => p.CiudadNacimiento)
            .Include(x => x.Persona)
                .ThenInclude(p => p.PaisNacimiento)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Entrenadores?> GetByNombreAsync(string nombre)
    {
        return await _context.Entrenadores
            .Include(x => x.Persona)
                .ThenInclude(p => p.CiudadNacimiento)
            .Include(x => x.Persona)
                .ThenInclude(p => p.PaisNacimiento)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Persona.Nombre== nombre);
    }

    public async Task<List<EntrenadorComboRequest>> GetComboAsync()
    {
        return await _context.Entrenadores
           .Where(x => x.Estado == "Activo")
           .Select(x => new EntrenadorComboRequest
           {
               Id = x.Id,
               NombreCompleto = x.Persona.Nombre + " " + x.Persona.Apellido
           })
           .OrderBy(x => x.NombreCompleto)
           .ToListAsync();
    }

    public async Task<Entrenadores> UpdateAsync(Entrenadores entrenadores)
    {
        _context.Entrenadores.Update(entrenadores);
        await _context.SaveChangesAsync();
        return entrenadores;
    }
}
