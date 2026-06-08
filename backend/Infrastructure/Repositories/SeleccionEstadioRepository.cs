using Application.Dto.config;
using Application.Dto.selecciones;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class SeleccionEstadioRepository:ISeleccionEstadioRepository
{
    private readonly AppDbContext _context;
    public SeleccionEstadioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<SeleccionEstadio> AddAsync(SeleccionEstadio seleccionEstadio)
    {
        _context.SeleccionEstadio.Add(seleccionEstadio);
        await _context.SaveChangesAsync();
        return seleccionEstadio;
    }

    public async Task<PagedResult<SeleccionEstadio>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? seleccion)
    {
        var query = _context.SeleccionEstadio
            .Include(a => a.Seleccion)
            .Include(a => a.Estadio)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(a =>
                a.Estadio.Nombre.Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(seleccion))
        {
            query = query.Where(a =>
                a.Seleccion.Nombre.Contains(seleccion));
        }

        var total = await query.CountAsync();

        var data = await query
         .OrderBy(a => a.Seleccion.Nombre)
         .Skip((page - 1) * pageSize)
         .Take(pageSize)
         .ToListAsync();

        return new PagedResult<SeleccionEstadio>
        {
            Items = data,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<SeleccionEstadio?> GetByIdAsync(int id)
    {
        return await _context.SeleccionEstadio
            .Include(x => x.Seleccion)
            .Include(x => x.Estadio)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<SeleccionEstadio> UpdateAsync(SeleccionEstadio seleccionEstadio)
    {
        _context.SeleccionEstadio.Update(seleccionEstadio);
        await _context.SaveChangesAsync();
        return seleccionEstadio;
    }

    public async Task<PagedResult<SeleccionEstadioResponse>> ListarPorSeleccion(
        int page,
        int pageSize,
        string? seleccion)
    {
        var query = _context.SeleccionEstadio
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(seleccion))
        {
            query = query.Where(x => x.Seleccion.Nombre == seleccion);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new SeleccionEstadioResponse
            {
                Id = x.Id,
                Seleccion = x.Seleccion.Nombre,
                Estadio = x.Estadio.Nombre,
                Ciudad = x.Estadio.Ciudad,
                Capacidad = x.Estadio.Capacidad,
                Tipo = x.Tipo
            })
            .ToListAsync();

        return new PagedResult<SeleccionEstadioResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<List<string>> GetEstadioAsync(string seleccion)
    {
        return await _context.SeleccionEstadio
            .Include(x => x.Estadio)
            .Include(x => x.Seleccion)
            .Where(x => x.Seleccion.Nombre == seleccion)
            .Select(x => x.Estadio.Nombre)
            .Distinct()
            .ToListAsync();
    }
}
