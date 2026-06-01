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

    public SeleccionesService(ISeleccionRepository repo)
    {
        _repo = repo;
    }

    public async Task<Selecciones> AddAsync(SeleccionesRequest seleccionesdto)
    {
      
        await ValidarDuplicadosAsync(seleccionesdto);

        var archivos = await GuardarArchivosAsync(seleccionesdto);

        var selecciones = new Selecciones
        {
            Nombre = seleccionesdto.Nombre,
            Confederacion = seleccionesdto.Confederacion,
            Clave = seleccionesdto.Nombre,
            Seudonimo = seleccionesdto.Seudonimo,
            CodigoFIFA = seleccionesdto.CodigoFIFA,
            Pais = seleccionesdto.Nombre,
            BanderaUrl = archivos.banderaUrl,
            EscudoUrl = archivos.escudoUrl,
            FechaCreacion= DateTime.Now,
            Estado = Estado.Activo
        };

        return await _repo.AddAsync(selecciones);
    }

    public async  Task<PagedResult<Selecciones>> GetAllAsync(int page, int pageSize, string? search, string? confederacion, string? estado)
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

        var archivos = await GuardarArchivosAsync(seleccionesdto);

        seleccion.Nombre = seleccionesdto.Nombre;
        seleccion.Confederacion = seleccionesdto.Confederacion;
        seleccion.Clave = seleccionesdto.Clave;
        seleccion.Seudonimo = seleccionesdto.Seudonimo;
        seleccion.CodigoFIFA = seleccionesdto.CodigoFIFA;
        seleccion.Pais = seleccionesdto.Pais;

        if (!string.IsNullOrEmpty(archivos.banderaUrl))
            seleccion.BanderaUrl = archivos.banderaUrl;

        if (!string.IsNullOrEmpty(archivos.escudoUrl))
            seleccion.EscudoUrl = archivos.escudoUrl;

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

    private async Task<(string banderaUrl, string escudoUrl)> GuardarArchivosAsync(SeleccionesRequest seleccionesDto)
    {
        var carpetaBase = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot/uploads/selecciones"
        );

        var carpetaBanderas = Path.Combine(carpetaBase, "banderas");
        var carpetaEscudos = Path.Combine(carpetaBase, "escudos");

        if (!Directory.Exists(carpetaBanderas))
            Directory.CreateDirectory(carpetaBanderas);

        if (!Directory.Exists(carpetaEscudos))
            Directory.CreateDirectory(carpetaEscudos);

        string banderaPath = "";
        string escudoPath = "";

        if (seleccionesDto.Bandera != null && seleccionesDto.Bandera.Length > 0)
        {
            var extensionBandera = Path.GetExtension(seleccionesDto.Bandera.FileName);

            var nombreBandera =
                $"{seleccionesDto.Nombre}_bandera_{Guid.NewGuid()}{extensionBandera}"
                .Replace(" ", "_")
                .Replace("/", "")
                .Replace("\\", "")
                .ToLower();

            var rutaBandera = Path.Combine(carpetaBanderas, nombreBandera);

            using (var stream = new FileStream(rutaBandera, FileMode.Create))
            {
                await seleccionesDto.Bandera.CopyToAsync(stream);
            }

            banderaPath = $"/uploads/selecciones/banderas/{nombreBandera}";
        }

        if (seleccionesDto.Escudo != null && seleccionesDto.Escudo.Length > 0)
        {
            var extensionEscudo = Path.GetExtension(seleccionesDto.Escudo.FileName);

            var nombreEscudo =
                $"{seleccionesDto.Nombre}_escudo_{Guid.NewGuid()}{extensionEscudo}"
                .Replace(" ", "_")
                .Replace("/", "")
                .Replace("\\", "")
                .ToLower();

            var rutaEscudo = Path.Combine(carpetaEscudos, nombreEscudo);

            using (var stream = new FileStream(rutaEscudo, FileMode.Create))
            {
                await seleccionesDto.Escudo.CopyToAsync(stream);
            }

            escudoPath = $"/uploads/selecciones/escudos/{nombreEscudo}";
        }

        return (banderaPath, escudoPath);
    }

}
