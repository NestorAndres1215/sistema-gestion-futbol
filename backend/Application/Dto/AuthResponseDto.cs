using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dto;

public class AuthResponseDto
{
    public string? Username { get; set; }
    public string? Token { get; set; }
    public string? Rol { get; set; }
}
