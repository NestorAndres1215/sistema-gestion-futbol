using Application.Common.Exceptions;
using Application.Common.Models;
using Application.Features.ParamatrosSistemas.Dto;
using Application.Features.ParamatrosSistemas.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Entities;

namespace Application.Features.ParamatrosSistemas.Services;

public class ParametroSistemaService : IParametroSistemaService
{

    private readonly IParametrosSistemaRepository _repository;

    public ParametroSistemaService( IParametrosSistemaRepository repository )
    {
        _repository = repository;
    }

    public async Task<ParametroSistema> AddAsync(ParametroRequest parametro )
    {
        await ValidarParametro(parametro);

        var entity = new ParametroSistema
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

    public async Task<ParametroSistema?> GetByClaveAsync(string clave)
    {
        return await _repository.GetByClaveAsync(clave)
            ?? throw new NotFoundException("Parameto no encontrado");
    }

    public async  Task<ParametroSistema?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Parametro no encontrado");
    }

    public async Task<ParametroSistema> UpdateAsync(int id, ParametroRequest parametro)
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


    private async Task ValidarParametro( ParametroRequest parametro,int? idExcluir = null)
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
