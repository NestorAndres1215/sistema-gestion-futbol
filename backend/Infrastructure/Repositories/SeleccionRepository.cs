
using Application.Common.Models;
using Application.Features.Selecciones.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class SeleccionRepository:ISeleccionRepository
{
    private readonly AppDbContext _context;
    public SeleccionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async  Task<Seleccion> AddAsync(Seleccion selecciones)
    {
        _context.Selecciones.Add(selecciones);
        await _context.SaveChangesAsync();
        return selecciones;
    }

    public async Task<PagedResult<SeleccionesResponse>> GetAllAsync(
      int page,
      int pageSize,
      string? search,
      string? confederacion,
      string? estado)
    {
        var query = _context.Selecciones
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim();

            query = query.Where(x =>
                x.Nombre.Contains(s));
        }

        if (!string.IsNullOrWhiteSpace(confederacion))
        {
            var c = confederacion.Trim();

            query = query.Where(x =>
                x.Confederacion != null &&
                x.Confederacion == c);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            var e = estado.Trim();

            query = query.Where(x =>
                x.Estado != null &&
                x.Estado == e);
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Nombre)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new SeleccionesResponse
            {
                Id = x.Id,
                Clave = x.Clave,
                Seleccion = x.Nombre,
                Confederacion = x.Confederacion ?? "",
                CodigoFIFA = x.CodigoFIFA ?? "",
                Seudonimo = x.Seudonimo ?? "",
                Bandera=x.BanderaUrl,
                Escudo=x.EscudoUrl,
                
            })
            .ToListAsync();

        return new PagedResult<SeleccionesResponse>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Seleccion?> GetByClaveAsync(string clave)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Clave == clave);
    }

    public async Task<Seleccion?> GetByCodigoFifaAsync(string codigoFifa)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.CodigoFIFA == codigoFifa);
    }

    public async  Task<Seleccion?> GetByConfederacionAsync(string confederacion)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Confederacion == confederacion);
    }

    public async Task<Seleccion?> GetByIdAsync(int id)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Seleccion?> GetByNombreAsync(string nombre)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<Seleccion?> GetByPaisAsync(string pais)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Pais == pais);
    }

    public async Task<Seleccion> UpdateAsync(Seleccion selecciones)
    {
        _context.Selecciones.Update(selecciones);
        await _context.SaveChangesAsync();
        return selecciones;
    }
}
