using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class TorneoConfiguration : IEntityTypeConfiguration<Torneo>
{
    public void Configure(EntityTypeBuilder<Torneo> builder)
    {
        builder.ToTable("Torneos");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Nombre)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(t => t.Tipo)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(t => t.TipoParticipante)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(t => t.Descripcion)
            .HasMaxLength(500);

        builder.Property(t => t.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(t => t.FechaCreacion)
            .HasDefaultValueSql("GETDATE()");

        builder.HasIndex(t => t.Nombre);
    }
}