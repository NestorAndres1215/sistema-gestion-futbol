using Application.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace Infrastructure.Repositories;

public class EstadioRepository : IEstadioRepository
{

    private readonly AppDbContext _context;

    public EstadioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Estadio> AddAsync(Estadio estadio)
    {
        await _context.Estadios.AddAsync(estadio);
        await _context.SaveChangesAsync();
        return estadio;
    }

    public async Task<PagedResult<Estadio>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? tipoCesped,
        string? pais,
        int? anio,
        string? estado)
    {
        var query = _context.Estadios
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.Trim();

            query = query.Where(x =>
                x.Nombre.Contains(search)
            );
        }

        if (!string.IsNullOrWhiteSpace(tipoCesped))
        {
            tipoCesped = tipoCesped.Trim().ToUpper();

            query = query.Where(x =>
                x.TipoCesped != null &&
                x.TipoCesped.ToUpper() == tipoCesped
            );
        }

        if (!string.IsNullOrWhiteSpace(pais))
        {
            pais = pais.Trim().ToUpper();

            query = query.Where(x =>
                x.Pais != null &&
                x.Pais.ToUpper() == pais
            );
        }

        if (anio.HasValue)
        {
            query = query.Where(x => x.Anio == anio);
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

        return new PagedResult<Estadio>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<List<int>> GetAniosAsync()
    {
        return await _context.Estadios
            .AsNoTracking()
            .Where(x => x.Anio.HasValue)
            .Select(x => x.Anio!.Value)
            .Distinct()
            .OrderBy(x => x)
            .ToListAsync();
    }

    public async  Task<Estadio?> GetByIdAsync(int id)
    {
        return await _context.Estadios
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Estadio?> GetByNombreAsync(string nombre)
    {
        return await _context.Estadios
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<Estadio> UpdateAsync(Estadio estadio)
    {
        _context.Estadios.Update(estadio);

        await _context.SaveChangesAsync();

        return estadio;
    }
}
