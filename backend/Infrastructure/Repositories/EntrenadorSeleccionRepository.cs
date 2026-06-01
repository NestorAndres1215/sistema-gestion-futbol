using Application.Dto.config;
using Application.Dto.selecciones;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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


    public async Task<EntrenadorSeleccion?> GetByIdAsync(int id)
    {
        return await _context.EntrenadorSeleccion
            .Include(x => x.Seleccion)
            .Include(x => x.Entrenador)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }



    public async Task<List<string>> GetEntrenadoresAsync(string seleccion)
    {
        return await _context.EntrenadorSeleccion
            .Include(x => x.Entrenador)
            .Include(x => x.Seleccion)
            .Where(x => x.Seleccion != null && x.Seleccion.Nombre == seleccion)
            .Select(x => x.Entrenador != null && x.Entrenador.Persona != null 
                ? x.Entrenador.Persona.Nombre + " " + x.Entrenador.Persona.Apellido 
                : string.Empty)
            .Distinct()
            .OrderBy(x => x)
            .ToListAsync();
    }



    public async Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion(
        int page,
        int pageSize,
        string? seleccion)
    {
        var query = _context.EntrenadorSeleccion
            .Include(x => x.Seleccion)
            .Include(x => x.Entrenador)
                .ThenInclude(x => x.Persona)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(seleccion))
        {
            query = query.Where(x => x.Seleccion.Nombre == seleccion);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new SeleccionEntrenadorResponse
            {
                Id = x.Id,
                Seleccion = x.Seleccion.Nombre,
                EntrenadorNombre = x.Entrenador.Persona.Nombre,
                EntrenadorApellido = x.Entrenador.Persona.Apellido,
                Cargo = x.Cargo,
                FechaInicio = x.FechaInicio,
                FechaFin = x.FechaFin
            })
            .ToListAsync();

        return new PagedResult<SeleccionEntrenadorResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<List<EntrenadorSeleccion>> ListarPorSeleccionNombre(string nombre)
    {
        return await _context.EntrenadorSeleccion
            .Include(x => x.Seleccion)
            .Include(x => x.Entrenador)
            .Where(x => x.Seleccion.Nombre == nombre)
            .ToListAsync();
    }

    public async Task<EntrenadorSeleccion> UpdateAsync(EntrenadorSeleccion entrenadorSeleccion)
    {
        _context.EntrenadorSeleccion.Update(entrenadorSeleccion);
        await _context.SaveChangesAsync();
        return entrenadorSeleccion;
    }
}
