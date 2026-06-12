using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class SeleccionConfiguration : IEntityTypeConfiguration<Seleccion>
{
    public void Configure(EntityTypeBuilder<Seleccion> builder)
    {
        builder.ToTable("Selecciones");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.Nombre)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(s => s.Confederacion)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(s => s.Clave)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(s => s.Seudonimo)
            .HasMaxLength(100);

        builder.Property(s => s.CodigoFIFA)
            .IsRequired()
            .HasMaxLength(3);

        builder.Property(s => s.Pais)
            .HasMaxLength(100);

        builder.Property(s => s.BanderaUrl)
            .HasMaxLength(500);

        builder.Property(s => s.EscudoUrl)
            .HasMaxLength(500);

        builder.Property(s => s.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(s => s.FechaCreacion)
            .HasDefaultValueSql("GETDATE()");

        builder.HasIndex(s => s.Nombre)
            .IsUnique();

        builder.HasIndex(s => s.Clave)
            .IsUnique();

        builder.HasIndex(s => s.CodigoFIFA)
            .IsUnique();
    }
}