using Application.Dto;
using Application.Dto.estadisticas;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;



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

    public async Task<int> ObtenerTotalEstadiosAsync()
    {
        return await _context.Estadios.CountAsync();
    }

    public async Task<double> ObtenerPromedioCapacidadAsync()
    {
        return await _context.Estadios
            .AverageAsync(e => e.Capacidad);
    }

    public async Task<int> ObtenerTotalPaisesConEstadiosAsync()
    {
        return await _context.Estadios
            .Select(e => e.Pais)
            .Distinct()
            .CountAsync();
    }

    // Países con más estadios
    public async Task<List<ItemDto>> ObtenerPaisesConMasEstadiosAsync(int cantidad)
    {
        return await _context.Estadios
            .GroupBy(e => e.Pais)
            .Select(g => new ItemDto
            {
                nombre = g.Key,
                valor = g.Count()
            })
            .OrderByDescending(x => x.valor)
            .Take(cantidad)
            .ToListAsync();
    }

    // Países con menos estadios
    public async Task<List<ItemDto>> ObtenerPaisesConMenosEstadiosAsync(int cantidad)
    {
        return await _context.Estadios
            .GroupBy(e => e.Pais)
            .Select(g => new ItemDto
            {
                nombre = g.Key,
                valor = g.Count()
            })
            .OrderBy(x => x.valor)
            .Take(cantidad)
            .ToListAsync();
    }

    // Ciudades con más estadios
    public async Task<List<ItemDto>> ObtenerCiudadesConMasEstadiosAsync(int cantidad)
    {
        return await _context.Estadios
            .GroupBy(e => e.Ciudad)
            .Select(g => new ItemDto
            {
                nombre = g.Key,
                valor = g.Count()
            })
            .OrderByDescending(x => x.valor)
            .Take(cantidad)
            .ToListAsync();
    }

    // Ciudades con menos estadios
    public async Task<List<ItemDto>> ObtenerCiudadesConMenosEstadiosAsync(int cantidad)
    {
        return await _context.Estadios
            .GroupBy(e => e.Ciudad)
            .Select(g => new ItemDto
            {
                nombre = g.Key,
                valor = g.Count()
            })
            .OrderBy(x => x.valor)
            .Take(cantidad)
            .ToListAsync();
    }

    public async Task<List<ItemDto>> ObtenerDistribucionPorEstadoAsync()
    {
        var estados = new List<string>
            {
                "Disponible",
                "Mantenimiento",
                "Suspendido",
                "Remodelación",
                "Cerrado"
            };

        var data = await _context.Estadios
            .GroupBy(e => e.Estado)
            .Select(g => new
            {
                Estado = g.Key,
                Total = g.Count()
            })
            .ToListAsync();

        return estados.Select(estado => new ItemDto
        {
            nombre = estado,
            valor = data.FirstOrDefault(x => x.Estado == estado)?.Total ?? 0
        }).ToList();
    }

    public async Task<List<ItemDto>> ObtenerDistribucionTipoCespedAsync()
    {
        var tipos = new List<string>
            {
                "Natural",
                "Sintetico",
                "Hibrido"
            };

        var data = await _context.Estadios
            .GroupBy(e => e.TipoCesped)
            .Select(g => new
            {
                Tipo = g.Key,
                Total = g.Count()
            })
            .ToListAsync();

        return tipos.Select(tipo => new ItemDto
        {
            nombre = tipo,
            valor = data.FirstOrDefault(x => x.Tipo == tipo)?.Total ?? 0
        }).ToList();
    }

    // Repository
    public async Task<List<ItemDto>> ObtenerMayorCapacidadAsync(int cantidad)
    {
        return await _context.Estadios
            .OrderByDescending(e => e.Capacidad)
            .Take(cantidad)
            .Select(e => new ItemDto
            {
                nombre = e.Nombre,
                valor = e.Capacidad
            })
            .ToListAsync();
    }

    public async Task<List<ItemDto>> ObtenerMenorCapacidadAsync(int cantidad)
    {
        return await _context.Estadios
            .OrderBy(e => e.Capacidad)
            .Take(cantidad)
            .Select(e => new ItemDto
            {
                nombre = e.Nombre,
                valor = e.Capacidad
            })
            .ToListAsync();
    }

    public async Task<List<ItemDto>> ObtenerEstadiosMasAntiguosAsync(int cantidad)
    {
        return await _context.Estadios
            .Where(e => e.FechaApertura.HasValue)
            .OrderBy(e => e.FechaApertura)
            .Take(cantidad)
            .Select(e => new ItemDto
            {
                nombre = e.Nombre,
                valor = e.FechaApertura!.Value.Year
            })
            .ToListAsync();
    }

    public async Task<List<ItemDto>> ObtenerEstadiosMasNuevosAsync(int cantidad)
    {
        return await _context.Estadios
            .Where(e => e.FechaApertura.HasValue)
            .OrderByDescending(e => e.FechaApertura)
            .Take(cantidad)
            .Select(e => new ItemDto
            {
                nombre = e.Nombre,
                valor = e.FechaApertura!.Value.Year
            })
            .ToListAsync();
    }
}
