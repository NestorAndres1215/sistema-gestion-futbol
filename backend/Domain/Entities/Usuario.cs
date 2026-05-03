
using Domain.Entities;
using Domain.Enums;

public class Usuario
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public string Estado { get; set; }

    public int RolId { get; set; }
    public Rol Rol { get; set; }
}