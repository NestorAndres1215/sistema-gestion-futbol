using Application.Common.Models;
using Application.Features.ParamatrosSistemas.Dto;
using Domain.Entities;

namespace Application.Features.ParamatrosSistemas.Interfaces;

public interface IParametroSistemaService
{

    Task<PagedResult<ParametroResponse>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? categoria,
        string? tipoDato,
        string? estado);
    Task<ParametroSistema?> GetByIdAsync(int id);
    Task<ParametroSistema?> GetByClaveAsync(string clave);
    Task<ParametroSistema> AddAsync(ParametroRequest parametro);
    Task<ParametroSistema> UpdateAsync(int id,ParametroRequest parametro);

}
