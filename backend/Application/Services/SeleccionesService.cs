using Application.Common.Exceptions;
using Application.Dto.config;
using Application.Dto.selecciones;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;

namespace Application.Services;

public class SeleccionesService : ISelecionesService
{
    private readonly ISeleccionRepository _repo;
    private readonly IFotoService _fotoService;

    public SeleccionesService(ISeleccionRepository repo, IFotoService fotoService)
    {
        _repo = repo;
        _fotoService = fotoService;
    }

    public async Task<Selecciones> AddAsync(SeleccionesRequest seleccionesdto)
    {
      
        await ValidarDuplicadosAsync(seleccionesdto);

        var bandera = await _fotoService.GuardarFotoAsync(seleccionesdto.Bandera!, "selecciones/banderas", $"{seleccionesdto.Nombre}"); ;
        var escudo = await _fotoService.GuardarFotoAsync(seleccionesdto.Escudo!, "selecciones/escudos", $"{seleccionesdto.Nombre}");
        var selecciones = new Selecciones
        {
            Nombre = seleccionesdto.Nombre,
            Confederacion = seleccionesdto.Confederacion,
            Clave = seleccionesdto.Nombre,
            Seudonimo = seleccionesdto.Seudonimo,
            CodigoFIFA = seleccionesdto.CodigoFIFA,
            Pais = seleccionesdto.Nombre,
            BanderaUrl = bandera,
            EscudoUrl = escudo,
            FechaCreacion= DateTime.Now,
            Estado = Estado.Activo
        };

        return await _repo.AddAsync(selecciones);
    }

    public async  Task<PagedResult<SeleccionesResponse>> GetAllAsync(int page, int pageSize, string? search, string? confederacion, string? estado)
    {
        return await _repo.GetAllAsync(page,pageSize,search,confederacion,estado);
    }

    public async Task<Selecciones?> GetByClaveAsync(string clave)
    {
        return await _repo.GetByClaveAsync(clave)
            ?? throw new NotFoundException("Seleccion no encontrado");
    }

    public async Task<Selecciones?> GetByConfederacionAsync(string confederacion)
    {
        return await _repo.GetByConfederacionAsync(confederacion)
            ?? throw new NotFoundException("Seleccion no encontrado");
    }

    public async Task<Selecciones?> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Seleccion no encontrado");
    }

    public async Task<Selecciones?> GetByNombreAsync(string nombre)
    {
        return await _repo.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Seleccion no encontrado");
    }

    public async Task<Selecciones> UpdateAsync(int id, SeleccionesRequest seleccionesdto)
    {
        var seleccion = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("La selección no existe");

        await ValidarDuplicadosAsync( seleccionesdto,id);

        if (seleccionesdto.Bandera != null && seleccionesdto.Bandera.Length > 0)
        {
            if (!string.IsNullOrEmpty(seleccion.BanderaUrl))
                _fotoService.EliminarFoto(seleccion.BanderaUrl);

            seleccion.BanderaUrl = await _fotoService.GuardarFotoAsync(seleccionesdto.Bandera, "selecciones/banderas", $"{seleccionesdto.Nombre}");
        }

        if (seleccionesdto.Escudo != null && seleccionesdto.Escudo.Length > 0)
        {
            if (!string.IsNullOrEmpty(seleccion.EscudoUrl))
                _fotoService.EliminarFoto(seleccion.EscudoUrl);

            seleccion.EscudoUrl = await _fotoService.GuardarFotoAsync(seleccionesdto.Escudo, "selecciones/escudos", $"{seleccionesdto.Nombre}");

        }

       

        seleccion.Nombre = seleccionesdto.Nombre;
        seleccion.Confederacion = seleccionesdto.Confederacion;
        seleccion.Clave = seleccionesdto.Clave;
        seleccion.Seudonimo = seleccionesdto.Seudonimo;
        seleccion.CodigoFIFA = seleccionesdto.CodigoFIFA;
        seleccion.Pais = seleccionesdto.Pais;

        return await _repo.UpdateAsync(seleccion);
    }

    private async Task ValidarDuplicadosAsync(SeleccionesRequest dto, int? id = null)
    {
        var existeNombre = await _repo.GetByNombreAsync(dto.Nombre);
        if (existeNombre != null && existeNombre.Id != id)
            throw new BadRequestException("Ya existe una selección con ese nombre");

        var existeClave = await _repo.GetByClaveAsync(dto.Clave);
        if (existeClave != null && existeClave.Id != id)
            throw new BadRequestException("La clave ya está registrada");

        var existeCodigoFifa = await _repo.GetByCodigoFifaAsync(dto.CodigoFIFA);
        if (existeCodigoFifa != null && existeCodigoFifa.Id != id)
            throw new BadRequestException("El código FIFA ya está registrado");

        var existePais = await _repo.GetByPaisAsync(dto.Pais);
        if (existePais != null && existePais.Id != id)
            throw new BadRequestException("El país ya tiene una selección registrada");
    }

  
}
