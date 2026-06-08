using Application.Dto.config;
using Application.Dto.Config;
using Domain.Entities;


namespace Application.Interfaces.Services;

public interface IParametrosSistemaService
{

    Task<PagedResult<ParametroResponse>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? categoria,
        string? tipoDato,
        string? estado);
    Task<ParametrosSistema?> GetByIdAsync(int id);
    Task<ParametrosSistema?> GetByClaveAsync(string clave);
    Task<ParametrosSistema> AddAsync(ParametrosRequest parametro);
    Task<ParametrosSistema> UpdateAsync(int id,ParametrosRequest parametro);

}
