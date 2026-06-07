using Application.Dto.config;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ParametrosSistemaRepository:IParametrosSistemaRepository
{

    private readonly AppDbContext _context;

    public ParametrosSistemaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ParametrosSistema> AddAsync(ParametrosSistema parametro)
    {
        _context.ParametrosSistema.Add(parametro);

        await _context.SaveChangesAsync();

        return parametro;
    }

    public async Task<PagedResult<ParametroResponse>> GetAllAsync(
        int page, int pageSize, string? search,
        string? categoria, string? tipoDato, string? estado)
    {
        var query = _context.ParametrosSistema
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.Trim();

            query = query.Where(x =>
                x.Nombre.Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(categoria))
        {
            categoria = categoria.Trim().ToUpper();

            query = query.Where(x =>
                x.Categoria != null &&
                x.Categoria.ToUpper() == categoria);
        }

        if (!string.IsNullOrWhiteSpace(tipoDato))
        {
            tipoDato = tipoDato.Trim().ToUpper();

            query = query.Where(x =>
                x.TipoDato != null &&
                x.TipoDato.ToUpper() == tipoDato);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            estado = estado.Trim().ToUpper();

            query = query.Where(x =>
                x.Estado != null &&
                x.Estado.ToUpper() == estado);
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new ParametroResponse
            {
                Id = x.Id,
                Clave = x.Clave ?? "",
                Valor = x.Valor ?? "",
                Nombre = x.Nombre ?? "",
                Descripcion = x.Descripcion,
                Categoria = x.Categoria,
                TipoDato = x.TipoDato ?? ""
            })
            .ToListAsync();

        return new PagedResult<ParametroResponse>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<ParametrosSistema?> GetByClaveAsync(string clave)
    {
        return await _context.ParametrosSistema
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Clave == clave);
    }

    public async Task<ParametrosSistema?> GetByIdAsync(int id)
    {
        return await _context.ParametrosSistema
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<ParametrosSistema> UpdateAsync( ParametrosSistema parametro)
    {
         _context.ParametrosSistema.Update(parametro);

        await _context.SaveChangesAsync();

        return parametro;
    }

 
}
