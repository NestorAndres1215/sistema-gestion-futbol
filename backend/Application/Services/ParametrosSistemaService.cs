using Application.Common.Exceptions;
using Application.Common.Models;
using Application.Dto.Config;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;

namespace Application.Services;

public class ParametrosSistemaService : IParametrosSistemaService
{

    private readonly IParametrosSistemaRepository _repository;

    public ParametrosSistemaService( IParametrosSistemaRepository repository )
    {
        _repository = repository;
    }

    public async Task<ParametrosSistema> AddAsync(ParametrosRequest parametro )
    {
        await ValidarParametro(parametro);

        var entity = new ParametrosSistema
        {
            Clave = parametro.Clave.Trim().ToUpper(),
            Valor = parametro.Valor.Trim(),
            Nombre = parametro.Nombre.Trim(),
            Descripcion = parametro.Descripcion,
            Categoria = parametro.Categoria,
            TipoDato = parametro.TipoDato.ToUpper(),
            Estado = parametro.Estado,
            Editable = parametro.Editable,
            FechaCreacion = DateTime.Now
        };

        return await _repository.AddAsync(entity);
    }

    public async  Task<PagedResult<ParametroResponse>> GetAllAsync(int page, int pageSize, string? search, string? categoria, string? tipoDato, string? estado)
    {
        return await _repository.GetAllAsync(page,pageSize,search,categoria,tipoDato,estado);
    }

    public async Task<ParametrosSistema?> GetByClaveAsync(string clave)
    {
        return await _repository.GetByClaveAsync(clave)
            ?? throw new NotFoundException("Parameto no encontrado");
    }

    public async  Task<ParametrosSistema?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Parametro no encontrado");
    }

    public async Task<ParametrosSistema> UpdateAsync(int id, ParametrosRequest parametro)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
            throw new Exception("Parámetro no encontrado");

        await ValidarParametro(parametro, id);

        entity.Clave = parametro.Clave.Trim().ToUpper();
        entity.Valor = parametro.Valor.Trim();
        entity.Nombre = parametro.Nombre.Trim();
        entity.Descripcion = parametro.Descripcion;
        entity.Categoria = parametro.Categoria;
        entity.TipoDato = parametro.TipoDato.ToUpper();
        entity.Estado = parametro.Estado;
        entity.Editable = parametro.Editable;
        entity.FechaActualizacion = DateTime.Now;

        return await _repository.UpdateAsync(entity);
    }


    private async Task ValidarParametro( ParametrosRequest parametro,int? idExcluir = null)
    {
        if (string.IsNullOrWhiteSpace(parametro.Clave))
            throw new Exception("La clave es obligatoria");

        if (string.IsNullOrWhiteSpace(parametro.Nombre))
            throw new Exception("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(parametro.Valor))
            throw new Exception("El valor es obligatorio");

        if (string.IsNullOrWhiteSpace(parametro.TipoDato))
            throw new Exception("El tipo de dato es obligatorio");

        var existe = await _repository.GetByClaveAsync(parametro.Clave);

        if (existe != null && existe.Id != idExcluir)
            throw new Exception("La clave ya existe");

        var tiposValidos = new[] { "STRING", "INT", "BOOL", "DECIMAL" };

        if (!tiposValidos.Contains(parametro.TipoDato.ToUpper()))
            throw new Exception("Tipo de dato inválido");

        if (parametro.Estado != "ACTIVO" && parametro.Estado != "INACTIVO")
            throw new Exception("Estado inválido");

        if (parametro.Editable != "SI" && parametro.Editable != "NO")
            throw new Exception("Editable inválido");

        if (parametro.TipoDato.ToUpper() == "INT" &&
            !int.TryParse(parametro.Valor, out _))
            throw new Exception("El valor debe ser numérico");

        if (parametro.TipoDato.ToUpper() == "BOOL" &&
            !bool.TryParse(parametro.Valor, out _))
            throw new Exception("El valor debe ser true o false");

        if (parametro.TipoDato.ToUpper() == "DECIMAL" &&
            !decimal.TryParse(parametro.Valor, out _))
            throw new Exception("El valor debe ser decimal");
    }
}
