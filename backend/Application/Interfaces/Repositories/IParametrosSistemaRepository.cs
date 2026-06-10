using Application.Common.Models;
using Application.Dto.Config;
using Domain.Entities;


namespace Application.Interfaces.Repositories;

public interface IParametrosSistemaRepository
{
    Task<PagedResult<ParametroResponse>> GetAllAsync(int page,
     int pageSize,
     string? search,
     string? categoria,
     string? tipoDato,
     string? estado);

    Task<ParametrosSistema?> GetByIdAsync(int id);

    Task<ParametrosSistema?> GetByClaveAsync(string clave);

    Task<ParametrosSistema> AddAsync(ParametrosSistema parametro);

    Task<ParametrosSistema> UpdateAsync(ParametrosSistema parametro);
}