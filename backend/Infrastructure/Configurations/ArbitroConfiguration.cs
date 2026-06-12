using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ArbitroConfiguration : IEntityTypeConfiguration<Arbitro>
{
    public void Configure(EntityTypeBuilder<Arbitro> builder)
    {
        builder.ToTable("Arbitros");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Categoria)
            .HasMaxLength(50);

        builder.Property(a => a.RolArbitral)
            .HasMaxLength(50);

        builder.Property(a => a.EstadoFisico)
            .HasMaxLength(30);

        builder.Property(a => a.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(a => a.AnosExperiencia)
            .HasDefaultValue(0);

        builder.Property(a => a.Nivel)
            .HasDefaultValue(1);

        builder.Property(a => a.Reputacion)
            .HasDefaultValue(1);

        builder.Property(a => a.PartidosDirigidos)
            .HasDefaultValue(0);

        builder.Property(a => a.PrecisionDecisiones)
            .HasDefaultValue(0);

        builder.Property(a => a.TarjetasAmarillas)
            .HasDefaultValue(0);

        builder.Property(a => a.TarjetasRojas)
            .HasDefaultValue(0);

        builder.HasOne(a => a.Persona)
            .WithMany()
            .HasForeignKey(a => a.PersonaId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(a => a.PersonaId)
            .IsUnique();

        builder.ToTable(t =>
        {
            t.HasCheckConstraint(
                "CK_Arbitro_Nivel",
                "[Nivel] >= 0 AND [Nivel] <= 100 AND [Nivel] % 5 = 0");

            t.HasCheckConstraint(
                "CK_Arbitro_Reputacion",
                "[Reputacion] >= 0 AND [Reputacion] <= 100 AND [Reputacion] % 5 = 0");

            t.HasCheckConstraint(
                "CK_Arbitro_PrecisionDecisiones",
                "[PrecisionDecisiones] >= 0 AND [PrecisionDecisiones] <= 100 AND [PrecisionDecisiones] % 5 = 0");
        });
    }
}