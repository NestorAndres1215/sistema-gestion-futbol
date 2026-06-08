using Application.Common.Exceptions;
using Application.Dto.arbitros;
using Application.Dto.config;
using Application.Dto.estadisticas;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class ArbitrosService : IArbitrosService
{
    private readonly IArbitroRepository _repository;
    private readonly IFotoService _fotoService;
    private readonly IPersonasService _personasService;
    private readonly IPaisesRepository _paisRepo;
    private readonly ICiudadesRepository _ciudadRepo;
    

    public ArbitrosService(
        IFotoService fotoService,
        IArbitroRepository repository,
        IPersonasService service,
        IPaisesRepository paisRepo,
        ICiudadesRepository ciudadRepo)
    {
        _repository = repository;
        _personasService = service;
        _paisRepo = paisRepo;
        _ciudadRepo = ciudadRepo;
        _fotoService = fotoService;
    }


    public async Task<Arbitros> AddAsync(ArbitrosRequest arbitros)
    {
        ValidarDto(arbitros);
    
        string fotoUrl = await _fotoService.GuardarFotoAsync(arbitros.Foto!, "arbitros", $"{arbitros.Nombre}_{arbitros.Apellido}");

        var pais = await _paisRepo.GetByNombreAsync(arbitros.PaisNacimiento)
            ?? throw new NotFoundException("El país no existe.");

        var ciudad = await _ciudadRepo.GetByNombreAsync(arbitros.CiudadNacimiento)
            ?? throw new NotFoundException("La ciudad no existe.");

        var persona = new Personas
        {
            Nombre = arbitros.Nombre,
            Apellido = arbitros.Apellido,
            FechaNacimiento = arbitros.FechaNacimiento,
            PaisNacimientoId = pais.Id,
            CiudadNacimientoId = ciudad.Id,
            FotoUrl = fotoUrl,
            FechaCreacion = DateTime.Now,
            Estado = "Activo"
        };

        var personaCreada = await _personasService.AddAsync(persona);

        var arbitro = new Arbitros
        {
            PersonaId = personaCreada.Id,
            Categoria = arbitros.Categoria,
            RolArbitral = arbitros.RolArbitral,
            FechaDebut = arbitros.FechaDebut,
            FechaRetiro = arbitros.FechaRetiro,
            AnosExperiencia = CalcularAnosExperiencia(arbitros.FechaDebut),
            Nivel = arbitros.Nivel,
            Reputacion = arbitros.Reputacion,
            PartidosDirigidos=0,
            PrecisionDecisiones=0,
            TarjetasAmarillas=0,
            TarjetasRojas=0,
            EstadoFisico="Activo",
            Estado = "Activo"
        };

        await _repository.AddAsync(arbitro);

        return arbitro;
    }

    public async Task<PagedResult<ArbitrosResponse>> GetAllAsync(int page, int pageSize, string? search, string? categoria, string? pais, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, categoria, pais, estado);
    }

    public async Task<Arbitros> GetByIdAsync(int id)
    {
       return await _repository.GetByIdAsync(id)
         ?? throw new NotFoundException("Árbitro no encontrado");
    }

    public async  Task<Arbitros> UpdateAsync(int id, ArbitrosRequest dto)
    {
        if (dto == null)
            throw new BadRequestException("Datos inválidos");

        ValidarDto(dto);

        var arbitro = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No se encontró el árbitro con id {id}");

        var persona = arbitro.Persona
            ?? throw new NotFoundException("Persona no encontrada");

        var pais = await _paisRepo.GetByNombreAsync(dto.PaisNacimiento)
            ?? throw new NotFoundException("El país no existe");

        var ciudad = await _ciudadRepo.GetByNombreAsync(dto.CiudadNacimiento)
            ?? throw new NotFoundException("La ciudad no existe");


        if (dto.Foto != null && dto.Foto.Length > 0)
        {
            if (!string.IsNullOrEmpty(persona.FotoUrl))
                _fotoService.EliminarFoto(persona.FotoUrl);

            persona.FotoUrl = await _fotoService.GuardarFotoAsync(dto.Foto, "arbitros", $"{dto.Nombre}_{dto.Apellido}");
        }


        persona.Nombre = dto.Nombre;
        persona.Apellido = dto.Apellido;
        persona.FechaNacimiento = dto.FechaNacimiento;
        persona.PaisNacimientoId = pais.Id;
        persona.CiudadNacimientoId = ciudad.Id;
        persona.FechaActualizacion = DateTime.Now;

        await _personasService.UpdateAsync(persona);

        arbitro.Categoria = dto.Categoria;
        arbitro.RolArbitral = dto.RolArbitral;
        arbitro.FechaDebut = dto.FechaDebut;
        arbitro.FechaRetiro = dto.FechaRetiro;
        arbitro.AnosExperiencia = CalcularAnosExperiencia(dto.FechaDebut);
        arbitro.Nivel = dto.Nivel;
        arbitro.Reputacion = dto.Reputacion;
        arbitro.PartidosDirigidos= dto.PartidosDirigidos;
        arbitro.PrecisionDecisiones=dto.PrecisionDecisiones;
        arbitro.TarjetasAmarillas = dto.TarjetasAmarillas;
        arbitro.TarjetasRojas = dto.TarjetasRojas;

        await _repository.UpdateAsync(arbitro);

        return arbitro;
    }

    private int CalcularAnosExperiencia(DateTime? fechaDebut)
    {
        if (!fechaDebut.HasValue)
            return 0;

        var hoy = DateTime.Today;
        var fecha = fechaDebut.Value;

        var anos = hoy.Year - fecha.Year;

        if (fecha.Date > hoy.AddYears(-anos))
            anos--;

        return Math.Max(0, anos);
    }
   

    private void ValidarDto(ArbitrosRequest dto)
    {
        if (dto is null)
            throw new BadRequestException("El cuerpo de la solicitud es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.PaisNacimiento))
            throw new BadRequestException("El país es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.CiudadNacimiento))
            throw new BadRequestException("La ciudad es obligatoria");

        if (dto.FechaNacimiento > DateTime.Today)
            throw new BadRequestException("La fecha de nacimiento no es válida");

        if (dto.FechaRetiro.HasValue &&
            dto.FechaDebut.HasValue &&
            dto.FechaRetiro < dto.FechaDebut)
            throw new BadRequestException("La fecha de retiro no puede ser menor al debut");
    }


    public async Task<TotalCountResponse> ObtenerTotalArbitrosAsync()
    {
        var total = await _repository.ObtenerTotalArbitrosAsync();

        return new TotalCountResponse
        {
            Total = total
        };
    }

    public async Task<TotalCountResponse> ObtenerArbitrosActivosAsync()
    {
        var total = await _repository.ObtenerArbitrosActivosAsync();

        return new TotalCountResponse
        {
            Total = total
        };
    }

    public async Task<AverageResponse> ObtenerPrecisionPromedioAsync()
    {
        var promedio = await _repository.ObtenerPrecisionPromedioAsync();

        return new AverageResponse
        {
            Promedio = promedio
        };
    }

    public async Task<AverageResponse> ObtenerReputacionPromedioAsync()
    {
        return new AverageResponse
        {
            Promedio = await _repository.ObtenerReputacionPromedioAsync()
        };
    }


    public async Task<List<ItemResponse>> ObtenerArbitrosPorPaisAsync()
    {
        return await _repository.ObtenerArbitrosPorPaisAsync();
    }


    public async Task<List<ItemResponse>> ObtenerArbitrosConMasPartidosAsync(int cantidad)
    {
        return await _repository.ObtenerArbitrosConMasPartidosAsync(cantidad);
    }

    public async Task<List<ItemResponse>> ObtenerRolArbitralAsync()
    {
        return await _repository.ObtenerRolArbitralAsync();
    }

    public async Task<List<ItemResponse>> ObtenerEstadoFisicoAsync()
    {
        return await _repository.ObtenerEstadoFisicoAsync();
    }

    public async Task<List<ItemResponse>> ObtenerDebutsPorAnioAsync()
    {
        return await _repository.ObtenerDebutsPorAnioAsync();
    }

    public async Task<List<ItemResponse>> ObtenerArbitrosConMejorNivelAsync(int cantidad)
    {
        return await _repository.ObtenerArbitrosConMejorNivelAsync(cantidad);
    }

    public async Task<List<ItemResponse>> ObtenerArbitrosActivosVsRetiradosAsync()
    {
        return await _repository.ObtenerArbitrosActivosVsRetiradosAsync();
    }

    public async Task<AverageResponse> ObtenerEdadPromedioAsync()
    {
        return new AverageResponse
        {
            Promedio = await _repository.ObtenerEdadPromedioAsync()
        };
    }

    public async Task<List<ItemResponse>> ObtenerPromedioTarjetasAsync()
    {
        return await _repository.ObtenerPromedioTarjetasAsync();
    }

    public async Task<List<ItemResponse>> ObtenerTopExperienciaAsync(int cantidad)
    {
        return await _repository.ObtenerTopExperienciaAsync(cantidad);
    }

    public async Task<List<ItemResponse>> ObtenerTopReputacionAsync(int cantidad)
    {
        return await _repository.ObtenerTopReputacionAsync(cantidad);
    }
}
