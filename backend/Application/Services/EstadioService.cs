using Application.Common.Exceptions;
using Application.Dto;
using Application.Dto.estadisticas;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;


namespace Application.Services;

public class EstadioService : IEstadioService
{

    private readonly IEstadioRepository _repository;

    public EstadioService(IEstadioRepository repository)
    {
        _repository = repository;
    }


    public async Task<Estadio> AddAsync(EstadioDTo dto)
    {

        ValidarDto(dto);
        string fotoUrl = await GuardarFotoAsync(dto);

        var estadio = new Estadio
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion ?? "",
            FechaApertura = dto.FechaApertura,
            Anio = dto.Anio,
            Ciudad = dto.Ciudad,
            Pais = dto.Pais,
            Latitud = dto.Latitud,
            Longitud = dto.Longitud,
            Capacidad = dto.Capacidad,
            TipoCesped = dto.TipoCesped,
            FotoUrl = fotoUrl,
            Estado = "Disponible",
            FechaCreacion = DateTime.Now
        };
            return await _repository.AddAsync(estadio);
 
    }

    private async Task<string> GuardarFotoAsync(EstadioDTo dto)
    {
        if (dto.Foto == null)
            return "";

        var carpeta = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot/uploads/estadios"
        );

        if (!Directory.Exists(carpeta))
            Directory.CreateDirectory(carpeta);

        var extension = Path.GetExtension(dto.Foto.FileName);

        var nombreBase =
            $"{dto.Nombre}_{dto.Pais}_{dto.Ciudad}"
            .Replace(" ", "_")
            .Replace("/", "")
            .Replace("\\", "")
            .ToLower();

        var nombreArchivo =
            $"{nombreBase}_{Guid.NewGuid()}{extension}";

        var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
        {
            await dto.Foto.CopyToAsync(stream);
        }

       return  $"/uploads/estadios/{nombreArchivo}";

    }

    private void ValidarDto(EstadioDTo dto)
    {
        if (dto == null)
            throw new BadRequestException(nameof(dto));

        if (string.IsNullOrWhiteSpace(dto.Nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Pais))
            throw new BadRequestException("El país es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Ciudad))
            throw new BadRequestException("La ciudad es obligatoria");

        if (dto.Capacidad <= 0)
            throw new BadRequestException("La capacidad debe ser mayor a 0");

        if (dto.FechaApertura > DateTime.Now)
            throw new BadRequestException(
                "La fecha de apertura no puede ser mayor a la fecha actual"
            );

        if ( dto.Anio <= 0 || dto.Anio > DateTime.Now.Year)
        {
            throw new BadRequestException( "El año no es válido");
        }
    }

    public async  Task<PagedResult<Estadio>> GetAllAsync(int page, int pageSize, string? search, string? tipoCesped, string? pais, int? anio, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, tipoCesped, pais, anio, estado);
    }

    public async Task<List<int>> GetAniosAsync()
    {
        return await _repository.GetAniosAsync()
            ?? throw new NotFoundException("Anios no encontrado");
    }

    public async  Task<Estadio?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Estadio no encontrado");
    }

    public async Task<Estadio?> GetByNombreAsync(string nombre)
    {
        return await _repository.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Estadio no encontrado");
    }

    public async Task<Estadio> UpdateAsync(int id, EstadioDTo estadioDTo)
    {
        var estadio = await _repository.GetByIdAsync(id);

        if (estadio == null)
            throw new NotFoundException($"No se encontró el estadio con id {id}");

        ValidarDto(estadioDTo);

        // duplicado nombre
        if (!string.Equals(estadio.Nombre, estadioDTo.Nombre, StringComparison.OrdinalIgnoreCase))
        {
            var existente = await _repository.GetByNombreAsync(estadioDTo.Nombre);

            if (existente != null && existente.Id != id)
                throw new BadRequestException("Ya existe un estadio con ese nombre");
        }

        // foto
        if (estadioDTo.Foto != null)
        {
            if (!string.IsNullOrEmpty(estadio.FotoUrl))
            {
                var rutaAnterior = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    estadio.FotoUrl.TrimStart('/')
                );

                if (File.Exists(rutaAnterior))
                    File.Delete(rutaAnterior);
            }

            estadio.FotoUrl = await GuardarFotoAsync(estadioDTo);
        }

        // update fields
        estadio.Nombre = estadioDTo.Nombre;
        estadio.Descripcion = estadioDTo.Descripcion ?? "";
        estadio.FechaApertura = estadioDTo.FechaApertura;
        estadio.Anio = estadioDTo.Anio;
        estadio.Ciudad = estadioDTo.Ciudad;
        estadio.Pais = estadioDTo.Pais;
        estadio.Latitud = estadioDTo.Latitud;
        estadio.Longitud = estadioDTo.Longitud;
        estadio.Capacidad = estadioDTo.Capacidad;
        estadio.TipoCesped = estadioDTo.TipoCesped;

        estadio.FechaActualizacion = DateTime.Now;

        await _repository.UpdateAsync(estadio);

        return estadio;
    }

    public async Task<TotalCountDto> ObtenerTotalEstadiosAsync()
    {
        var total = await _repository.ObtenerTotalEstadiosAsync();

        return new TotalCountDto
        {
            Total = total
        };
    }

    public async Task<AverageDto> ObtenerPromedioCapacidadAsync()
    {
        var promedio = await _repository.ObtenerPromedioCapacidadAsync();

        return new AverageDto
        {
            Promedio = promedio
        };
    }

    public async Task<TotalCountDto> ObtenerTotalPaisesConEstadiosAsync()
    {
        var total = await _repository.ObtenerTotalPaisesConEstadiosAsync();

        return new TotalCountDto
        {
            Total = total
        };
    }
    public async Task<List<ItemDto>> ObtenerPaisesConMasEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerPaisesConMasEstadiosAsync(cantidad);
    }
    public async Task<List<ItemDto>> ObtenerPaisesConMenosEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerPaisesConMenosEstadiosAsync(cantidad);
    }
    public async Task<List<ItemDto>> ObtenerCiudadesConMasEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerCiudadesConMasEstadiosAsync(cantidad);
    }
    public async Task<List<ItemDto>> ObtenerCiudadesConMenosEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerCiudadesConMenosEstadiosAsync(cantidad);
    }
    public async Task<List<ItemDto>> ObtenerDistribucionPorEstadoAsync()
    {
        return await _repository.ObtenerDistribucionPorEstadoAsync();
    }
    public async Task<List<ItemDto>> ObtenerDistribucionTipoCespedAsync()
    {
        return await _repository.ObtenerDistribucionTipoCespedAsync();
    }
    public async Task<List<ItemDto>> ObtenerMayorCapacidadAsync(int cantidad)
    {
        return await _repository.ObtenerMayorCapacidadAsync(cantidad);
    }
    public async Task<List<ItemDto>> ObtenerMenorCapacidadAsync(int cantidad)
    {
        return await _repository.ObtenerMenorCapacidadAsync(cantidad);
    }
    public async Task<List<ItemDto>> ObtenerEstadiosMasAntiguosAsync(int cantidad)
    {
        return await _repository.ObtenerEstadiosMasAntiguosAsync(cantidad);
    }
    public async Task<List<ItemDto>> ObtenerEstadiosMasNuevosAsync(int cantidad)
    {
        return await _repository.ObtenerEstadiosMasNuevosAsync(cantidad);
    }

}

