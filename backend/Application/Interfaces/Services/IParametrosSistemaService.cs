using Application.Dto;
using Domain.Entities;


namespace Application.Interfaces.Services;

public interface IParametrosSistemaService
{

    Task<PagedResult<ParametrosSistema>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? categoria,
        string? tipoDato,
        string? estado);
    Task<ParametrosSistema?> GetByIdAsync(int id);
    Task<ParametrosSistema?> GetByClaveAsync(string clave);
    Task<ParametrosSistema> AddAsync(ParametrosSistemaDto parametro);
    Task<ParametrosSistema> UpdateAsync(int id,ParametrosSistemaDto parametro);

}
