using DJERICMAX_App.Dominio.ObjetoDeValor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DJERICMAX_App.Repositorio.Config
{
    public class FormaPagamentoConfiguration : IEntityTypeConfiguration<FormaPagamento>
    {
        public void Configure(EntityTypeBuilder<FormaPagamento> builder)
        {
            builder.HasKey(f => f.Id);
            builder.Property(f => f.Nome).HasMaxLength(50);
            builder.Property(f => f.Descricao).HasMaxLength(500);
            builder.Property(f => f.EhBoleto).HasMaxLength(3);
            builder.Property(f => f.EhCartaoCredito).HasMaxLength(3);
            builder.Property(f => f.EhDeposito).HasMaxLength(3);
            builder.Property(f => f.EhPix).HasMaxLength(3);
            builder.Property(f => f.NaoFoiDefinido).HasMaxLength(3);
        }
    }
}
