
using Application.Dto.Arbitros;
using Application.Dto.Config;
using Application.Dto.Estadisticas;
using Application.Interfaces.Repositories;

using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Repositories;

public class ArbitrosRepository : IArbitroRepository
{
    private readonly AppDbContext _context;
    public ArbitrosRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Arbitros> AddAsync(Arbitros arbitros)
    {
        _context.Arbitros.Add(arbitros);
        await _context.SaveChangesAsync();
        return arbitros;
    }

    public async Task<PagedResult<ArbitrosResponse>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? categoria,
        string? pais,
        string? estado)
    {
        var query = _context.Arbitros
           .Include(a => a.Persona)
               .ThenInclude(p => p.PaisNacimiento)
           .Include(a => a.Persona)
               .ThenInclude(p => p.CiudadNacimiento)
           .AsQueryable();


        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(a =>
                a.Persona != null &&
                (
                    a.Persona.Nombre.Contains(search) ||
                    a.Persona.Apellido.Contains(search) 
                )
            );
        }

        if (!string.IsNullOrWhiteSpace(categoria))
            query = query.Where(a => a.Categoria == categoria);

        if (!string.IsNullOrWhiteSpace(pais))
            query = query.Where(a =>
                a.Persona != null &&
                a.Persona.PaisNacimiento != null &&
                a.Persona.PaisNacimiento.Nombre.Contains(pais)
            );

        if (!string.IsNullOrWhiteSpace(estado))
            query = query.Where(a => a.Estado == estado);

        var total = await query.CountAsync();


        var data = await query
            .OrderByDescending(a => a.Nivel)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new ArbitrosResponse
            {
                Id = a.Id,
                Nombre = a.Persona != null ? a.Persona.Nombre : "",
                Apellido = a.Persona != null ? a.Persona.Apellido : "",
                Categoria = a.Categoria,
                Pais = a.Persona != null && a.Persona.PaisNacimiento != null
                    ? a.Persona.PaisNacimiento.Nombre
                    : "",
                Ciudad = a.Persona != null && a.Persona.CiudadNacimiento != null
                    ? a.Persona.CiudadNacimiento.Nombre
                    : "",
                Foto = a.Persona != null ? a.Persona.FotoUrl : null,
                FechaDebut = a.FechaDebut,
                Estado = a.Estado
            })
            .ToListAsync();


        return new PagedResult<ArbitrosResponse>
        {
            Items = data,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Arbitros?> GetByIdAsync(int id)
    {
        return await _context.Arbitros
            .Include(x => x.Persona)
                .ThenInclude(p => p.CiudadNacimiento)
            .Include(x => x.Persona)
                .ThenInclude(p => p.PaisNacimiento)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Arbitros> UpdateAsync(Arbitros arbitros)
    {
        _context.Arbitros.Update(arbitros);
        await _context.SaveChangesAsync();
        return arbitros;
    }

    public async Task<int> ObtenerTotalArbitrosAsync()
    {
        return await _context.Arbitros.CountAsync();
    }

    public async Task<int> ObtenerArbitrosActivosAsync()
    {
        return await _context.Arbitros
            .CountAsync(a => a.Estado == "Activo");
    }

    public async Task<double> ObtenerPrecisionPromedioAsync()
    {
        return await _context.Arbitros
            .AverageAsync(a => a.PrecisionDecisiones);
    }

    public async Task<double> ObtenerReputacionPromedioAsync()
    {
        return await _context.Arbitros
            .AverageAsync(a => a.Reputacion);
    }

    // Repository

    public async Task<List<ItemResponse>> ObtenerArbitrosPorPaisAsync()
    {
        return await _context.Arbitros
            .GroupBy(a => a.Persona.PaisNacimiento!.Nombre)
            .Select(g => new ItemResponse
            {
                nombre = g.Key,
                valor = g.Count()
            })
            .OrderByDescending(x => x.valor)
            .ToListAsync();
    }

    public async Task<List<ItemResponse>> ObtenerTopExperienciaAsync(int cantidad)
    {
        return await _context.Arbitros
            .OrderByDescending(a => a.AnosExperiencia)
            .Take(cantidad)
            .Select(a => new ItemResponse
            {
                nombre = a.Persona.Nombre + " " + a.Persona.Apellido,
                valor = a.AnosExperiencia
            })
            .ToListAsync();
    }

    public async Task<List<ItemResponse>> ObtenerTopReputacionAsync(int cantidad)
    {
        return await _context.Arbitros
            .OrderByDescending(a => a.Reputacion)
            .Take(cantidad)
            .Select(a => new ItemResponse
            {
                nombre = a.Persona.Nombre + " " + a.Persona.Apellido,
                valor = a.Reputacion
            })
            .ToListAsync();
    }

    public async Task<List<ItemResponse>> ObtenerArbitrosConMasPartidosAsync(int cantidad)
    {
        return await _context.Arbitros
            .OrderByDescending(a => a.PartidosDirigidos)
            .Take(cantidad)
            .Select(a => new ItemResponse
            {
                nombre = a.Persona.Nombre + " " + a.Persona.Apellido,
                valor = a.PartidosDirigidos
            })
            .ToListAsync();
    }

    public async Task<List<ItemResponse>> ObtenerRolArbitralAsync()
    {
        return await _context.Arbitros
            .GroupBy(a => a.RolArbitral)
            .Select(g => new ItemResponse
            {
                nombre = g.Key!,
                valor = g.Count()
            })
            .ToListAsync();
    }

    public async Task<List<ItemResponse>> ObtenerEstadoFisicoAsync()
    {
        var datos = await _context.Arbitros
            .GroupBy(a => a.EstadoFisico)
            .Select(g => new
            {
                Estado = g.Key,
                Cantidad = g.Count()
            })
            .ToListAsync();

        var estados = new List<string>
    {
        "Activo",
        "Fatigado",
        "Lesionado"
    };

        return estados.Select(e => new ItemResponse
        {
            nombre = e,
            valor = datos.FirstOrDefault(x => x.Estado == e)?.Cantidad ?? 0
        }).ToList();
    }

    public async Task<List<ItemResponse>> ObtenerDebutsPorAnioAsync()
    {
        return await _context.Arbitros
            .Where(a => a.FechaDebut.HasValue)
            .GroupBy(a => a.FechaDebut!.Value.Year)
            .Select(g => new ItemResponse
            {
                nombre = g.Key.ToString(),
                valor = g.Count()
            })
            .OrderBy(x => x.nombre)
            .ToListAsync();
    }

    public async Task<List<ItemResponse>> ObtenerArbitrosConMejorNivelAsync(int cantidad)
    {
        return await _context.Arbitros
            .OrderByDescending(a => a.Nivel)
            .Take(cantidad)
            .Select(a => new ItemResponse
            {
                nombre = a.Persona.Nombre + " " + a.Persona.Apellido,
                valor = a.Nivel
            })
            .ToListAsync();
    }

    public async Task<List<ItemResponse>> ObtenerArbitrosActivosVsRetiradosAsync()
    {
        return await _context.Arbitros
            .GroupBy(a => a.Estado)
            .Select(g => new ItemResponse
            {
                nombre = g.Key,
                valor = g.Count()
            })
            .ToListAsync();
    }

    public async Task<double> ObtenerEdadPromedioAsync()
    {
        return await _context.Arbitros
            .AverageAsync(a =>
                DateTime.Now.Year - a.Persona.FechaNacimiento!.Value.Year);
    }

    public async Task<List<ItemResponse>> ObtenerPromedioTarjetasAsync()
    {
        return new List<ItemResponse>
    {
        new ItemResponse
        {
            nombre = "Amarillas",
            valor = (int) await _context.Arbitros
                .AverageAsync(a => a.TarjetasAmarillas)
        },
        new ItemResponse
        {
            nombre = "Rojas",
            valor = (int)await _context.Arbitros
                .AverageAsync(a => a.TarjetasRojas)
        }
    };
    }


}
