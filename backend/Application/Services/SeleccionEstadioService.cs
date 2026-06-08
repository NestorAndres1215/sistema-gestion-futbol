using Application.Common.Exceptions;
using Application.Dto.config;
using Application.Dto.selecciones;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;

namespace Application.Services;

public class SeleccionEstadioService:ISeleccionEstadioService
{
    private readonly ISeleccionEstadioRepository _repository;
    private readonly ISeleccionRepository _seleccionRepository;
    private readonly IEstadioRepository _estadioRepository;

    public SeleccionEstadioService(
        ISeleccionEstadioRepository repository,
        ISeleccionRepository seleccionRepository,
        IEstadioRepository estadioRepository)
    {
        _repository = repository;
        _estadioRepository = estadioRepository;
        _seleccionRepository = seleccionRepository;
    }

    public async Task<SeleccionEstadio> AddAsync(SeleccionEstadioRequest seleccionEstadioDto)
    {

        var  seleccion = await _seleccionRepository.GetByNombreAsync(seleccionEstadioDto.Seleccion)
          ?? throw new NotFoundException("La Seleccion no existe.");

        var estadio = await _estadioRepository.GetByNombreAsync(seleccionEstadioDto.Estadio)
          ?? throw new NotFoundException("La Estadio no existe.");


        var seleccionEstadio = new SeleccionEstadio
        {
            EstadioId = estadio.Id,
            SeleccionId = seleccion.Id,
            Tipo = seleccionEstadioDto.Tipo
        };

        return await _repository.AddAsync(seleccionEstadio);
    }

    public async Task<PagedResult<SeleccionEstadio>> GetAllAsync(int page, int pageSize, string? search, string? seleccion)
    {
       return await _repository.GetAllAsync(page,pageSize,search,seleccion);
    }

    public async Task<SeleccionEstadio?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<SeleccionEstadio> UpdateAsync(int id, SeleccionEstadioRequest seleccionEstadioDto)
    {
        var entity = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("La relación selección-estadio no existe.");

        var seleccion = await _seleccionRepository
            .GetByNombreAsync(seleccionEstadioDto.Seleccion)
            ?? throw new NotFoundException("La selección no existe.");

        var estadio = await _estadioRepository
            .GetByNombreAsync(seleccionEstadioDto.Estadio)
            ?? throw new NotFoundException("El estadio no existe.");

        entity.SeleccionId = seleccion.Id;
        entity.EstadioId = estadio.Id;
        entity.Tipo = seleccionEstadioDto.Tipo;

        return await _repository.UpdateAsync(entity);
    }

    public async Task<PagedResult<SeleccionEstadioResponse>> ListarPorSeleccion(
        int page,
        int pageSize,
        string? seleccion)
    {
        return  await _repository.ListarPorSeleccion(
            page,
            pageSize,
            seleccion
        );


    }


    public async Task<List<string>> GetEstadioAsync(string seleccion)
    {
        return await _repository.GetEstadioAsync(seleccion);
    }
}
