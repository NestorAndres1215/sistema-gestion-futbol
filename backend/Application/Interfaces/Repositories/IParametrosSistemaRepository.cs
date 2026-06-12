using Application.Common.Models;
using Application.Features.ParamatrosSistemas.Dto;
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

    Task<ParametroSistema?> GetByIdAsync(int id);

    Task<ParametroSistema?> GetByClaveAsync(string clave);

    Task<ParametroSistema> AddAsync(ParametroSistema parametro);

    Task<ParametroSistema> UpdateAsync(ParametroSistema parametro);
}