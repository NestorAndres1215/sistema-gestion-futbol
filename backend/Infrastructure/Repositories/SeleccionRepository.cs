using Application.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Infrastructure.Repositories;

public class SeleccionRepository:ISeleccionRepository
{
    private readonly AppDbContext _context;
    public SeleccionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async  Task<Selecciones> AddAsync(Selecciones selecciones)
    {
        _context.Selecciones.Add(selecciones);
        await _context.SaveChangesAsync();
        return selecciones;
    }

    public async Task<PagedResult<Selecciones>> GetAllAsync(int page, int pageSize, string? search, string? confederacion, string? estado)
    {

        var query = _context.Selecciones
           .AsNoTracking()
           .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.Trim();

            query = query.Where(x =>
                x.Nombre.Contains(search)
            );
        }

        if (!string.IsNullOrWhiteSpace(confederacion))
        {
            confederacion = confederacion.Trim().ToUpper();

            query = query.Where(x =>
                x.Confederacion != null &&
                x.Confederacion.ToUpper() == confederacion
            );
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            estado = estado.Trim().ToUpper();

            query = query.Where(x =>
                x.Estado != null &&
                x.Estado.ToUpper() == estado
            );
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Selecciones>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Selecciones?> GetByClaveAsync(string clave)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Clave == clave);
    }

    public async Task<Selecciones?> GetByCodigoFifaAsync(string codigoFifa)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.CodigoFIFA == codigoFifa);
    }

    public async  Task<Selecciones?> GetByConfederacionAsync(string confederacion)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Confederacion == confederacion);
    }

    public async Task<Selecciones?> GetByIdAsync(int id)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Selecciones?> GetByNombreAsync(string nombre)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<Selecciones?> GetByPaisAsync(string pais)
    {
        return await _context.Selecciones
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Pais == pais);
    }

    public async Task<Selecciones> UpdateAsync(Selecciones selecciones)
    {
        _context.Selecciones.Update(selecciones);
        await _context.SaveChangesAsync();
        return selecciones;
    }
}
