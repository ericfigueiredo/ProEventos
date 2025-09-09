using DJERICMAX_App.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
{
    public void Configure(EntityTypeBuilder<Cliente> builder)
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Nome).IsRequired().HasMaxLength(50);
        builder.Property(c => c.SobreNome).HasMaxLength(50);
        builder.Property(c => c.CPF).HasMaxLength(14);
        builder.Property(c => c.RG).HasMaxLength(12);
        builder.Property(c => c.Telefone).IsRequired().HasMaxLength(13);
        builder.Property(c => c.Email).HasMaxLength(50);
        builder.Property(c => c.Logradouro).HasMaxLength(50);
        builder.Property(c => c.Num_Logradouro).HasMaxLength(5);
        builder.Property(c => c.Bairro).HasMaxLength(50);
        builder.Property(c => c.Cidade).IsRequired().HasMaxLength(50);
        builder.Property(c => c.UF).IsRequired().HasMaxLength(2);
        builder.Property(c => c.CEP).HasMaxLength(9);
        builder.Property(c => c.Data_Cadastro).IsRequired();
        builder.Property(c => c.EhCliente).IsRequired();

        // Esta configuração está correta
        builder.HasMany(c => c.Eventos)
               .WithOne(e => e.Cliente)
               .HasForeignKey(e => e.ClienteId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}