using DJERICMAX_App.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DJERICMAX_App.Repositorio.Config
{
    public class ServicoConfiguration : IEntityTypeConfiguration<Servico>
    {
        public void Configure(EntityTypeBuilder<Servico> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Nome)
                   .IsRequired()
                   .HasMaxLength(50);
            builder.Property(p => p.Descricao)
                   .IsRequired()
                   .HasMaxLength(500);
            builder.Property(p => p.Preco_Hora)
                   .HasColumnType("decimal(19,4)")
                   .IsRequired();

            // Adicionar configuração do nome do arquivo se necessário
            builder.Property(p => p.NomeArquivo)
                   .HasMaxLength(255);
        }
    }
}