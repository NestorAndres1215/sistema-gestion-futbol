using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class JugadorConfiguration : IEntityTypeConfiguration<Jugador>
{
    public void Configure(EntityTypeBuilder<Jugador> builder)
    {
        builder.ToTable("Jugadores");

        builder.HasKey(j => j.Id);

        builder.Property(j => j.PosicionPrincipal)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(j => j.PosicionSecundaria)
            .HasMaxLength(50);

        builder.Property(j => j.PiernaHabil)
            .HasMaxLength(20);

        builder.Property(j => j.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(j => j.EstadoFisico)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(j => j.AnosExperiencia)
            .HasDefaultValue(0);

        builder.HasOne(j => j.Persona)
            .WithMany()
            .HasForeignKey(j => j.PersonaId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(j => j.PersonaId)
            .IsUnique();

        builder.ToTable(t =>
        {
            t.HasCheckConstraint(
                "CK_Jugador_AnosExperiencia",
                "[AnosExperiencia] >= 0");
        });
    }
}