using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class EntrenadorConfiguration : IEntityTypeConfiguration<Entrenador>
{
    public void Configure(EntityTypeBuilder<Entrenador> builder)
    {
        builder.ToTable("Entrenadores");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.EstiloJuego)
            .HasMaxLength(50);

        builder.Property(e => e.SistemaTactico)
            .HasMaxLength(20);

        builder.Property(e => e.Licencia)
            .HasMaxLength(50);

        builder.Property(e => e.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(e => e.AnosExperiencia)
            .HasDefaultValue(0);

        builder.Property(e => e.Nivel)
            .HasDefaultValue(50);

        builder.Property(e => e.Reputacion)
            .HasDefaultValue(50);

        builder.Property(e => e.ManejoEquipo)
            .HasDefaultValue(50);

        builder.Property(e => e.Motivacion)
            .HasDefaultValue(50);

        builder.Property(e => e.Disciplina)
            .HasDefaultValue(50);

        builder.Property(e => e.Adaptabilidad)
            .HasDefaultValue(50);

        builder.HasOne(e => e.Persona)
            .WithMany()
            .HasForeignKey(e => e.PersonaId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(e => e.PersonaId)
            .IsUnique();

        builder.ToTable(t =>
        {
            t.HasCheckConstraint(
                "CK_Entrenador_AnosExperiencia",
                "[AnosExperiencia] >= 0");

            t.HasCheckConstraint(
                "CK_Entrenador_Nivel",
                "[Nivel] >= 0 AND [Nivel] <= 100 AND [Nivel] % 5 = 0");

            t.HasCheckConstraint(
                "CK_Entrenador_Reputacion",
                "[Reputacion] >= 0 AND [Reputacion] <= 100 AND [Reputacion] % 5 = 0");

            t.HasCheckConstraint(
                "CK_Entrenador_ManejoEquipo",
                "[ManejoEquipo] >= 0 AND [ManejoEquipo] <= 100 AND [ManejoEquipo] % 5 = 0");

            t.HasCheckConstraint(
                "CK_Entrenador_Motivacion",
                "[Motivacion] >= 0 AND [Motivacion] <= 100 AND [Motivacion] % 5 = 0");

            t.HasCheckConstraint(
                "CK_Entrenador_Disciplina",
                "[Disciplina] >= 0 AND [Disciplina] <= 100 AND [Disciplina] % 5 = 0");

            t.HasCheckConstraint(
                "CK_Entrenador_Adaptabilidad",
                "[Adaptabilidad] >= 0 AND [Adaptabilidad] <= 100 AND [Adaptabilidad] % 5 = 0");
        });
    }
}