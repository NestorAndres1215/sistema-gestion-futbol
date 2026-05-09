using Application.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Services;

public interface IEstadioService
{
    Task<Estadio> AddAsync(EstadioDTo estadioDTo);
}
