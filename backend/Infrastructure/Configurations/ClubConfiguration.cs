using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ClubConfiguration : IEntityTypeConfiguration<Club>
{
    public void Configure(EntityTypeBuilder<Club> builder)
    {
        builder.ToTable("Clubes");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nombre)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(c => c.Seudonimo)
            .HasMaxLength(100);

        builder.Property(c => c.Confederacion)
            .HasMaxLength(50);

        builder.Property(c => c.CodigoFifa)
            .HasMaxLength(20);

        builder.Property(c => c.Pais)
            .HasMaxLength(100);

        builder.Property(c => c.Ciudad)
            .HasMaxLength(100);

        builder.Property(c => c.EscudoUrl)
            .HasMaxLength(500);

        builder.Property(c => c.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(c => c.FechaCreacion)
            .HasDefaultValueSql("GETDATE()");

        builder.HasIndex(c => c.Nombre)
            .IsUnique();

        builder.HasIndex(c => c.CodigoFifa)
            .IsUnique();
    }
}