using Application.Dto.clubes;
using Application.Dto.config;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ClubesRepository: IClubesRepository
{
    private readonly AppDbContext _context;
    public ClubesRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Clubes> AddAsync(Clubes clubes)
    {
        _context.Clubes.Add(clubes);
        await _context.SaveChangesAsync();
        return clubes;
    }

    public async Task<PagedResult<ClubesResponse>> GetAllAsync(int page, int pageSize, string? search, string? confederacion, string? estado)
    {
        var query = _context.Clubes
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
            .Select(x => new ClubesResponse
            {
                Id = x.Id,
                Nombre = x.Nombre,
                CodigoFifa = x.CodigoFifa,
                Confederacion = x.Confederacion ?? "",
                Seudonimo = x.Seudonimo ?? "",
                Pais = x.Pais ?? "",
                Ciudad = x.Ciudad ?? "",
                FechaFundacion = x.FechaFundacion,
                EscudoUrl = x.EscudoUrl
            })
            .ToListAsync();

        return new PagedResult<ClubesResponse>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }



    public async Task<Clubes?> GetByCodigoFifaAsync(string codigoFifa)
    {
        return await _context.Clubes
           .AsNoTracking()
           .FirstOrDefaultAsync(x => x.CodigoFifa == codigoFifa);
    }

    public async Task<Clubes?> GetByConfederacionAsync(string confederacion)
    {
        return await _context.Clubes
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Confederacion == confederacion);
    }

    public async Task<Clubes?> GetByIdAsync(int id)
    {
        return await _context.Clubes
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Clubes?> GetByNombreAsync(string nombre)
    {
        return await _context.Clubes
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<Clubes?> GetByPaisAsync(string pais)
    {
        return await _context.Clubes
          .AsNoTracking()
          .FirstOrDefaultAsync(x => x.Pais == pais);
    }

    public async Task<Clubes> UpdateAsync(Clubes clubes)
    {
        _context.Clubes.Update(clubes);
        await _context.SaveChangesAsync();
        return clubes;
    }
}
