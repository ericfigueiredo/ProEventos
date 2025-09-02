using DJERICMAX_App.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DJERICMAX_App.Repositorio.Config
{
    public class EventoConfiguration : IEntityTypeConfiguration<Evento>
    {
        public void Configure(EntityTypeBuilder<Evento> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.NomeEvento).HasMaxLength(50).IsRequired();
            builder.Property(e => e.HoraInicio);
            builder.Property(e => e.HoraFinal);
            builder.Property(e => e.DataCadastro);
            builder.Property(e => e.DataContrato);
            builder.Property(e => e.DataEvento).IsRequired();
            builder.Property(e => e.Convidados).HasMaxLength(3);
            builder.Property(e => e.Pacote).HasMaxLength(50);
            builder.Property(e => e.Observacoes).HasMaxLength(600);
            builder.Property(e => e.Parcelado);
            builder.Property(e => e.QtdeParcelas).HasMaxLength(2);
            builder.Property(e => e.ValorParcelas).HasMaxLength(5);
            builder.Property(e => e.LogradouroEvento).HasMaxLength(50);
            builder.Property(e => e.NumLogradouroEvento).HasMaxLength(5);
            builder.Property(e => e.BairroEvento).HasMaxLength(30);
            builder.Property(e => e.CidadeEvento).HasMaxLength(30).IsRequired();
            builder.Property(e => e.UfEvento).HasMaxLength(2).IsRequired();
            builder.Property(e => e.CepEvento).HasMaxLength(5);

            //builder.HasOne(e => e.Cliente);

            builder.HasOne(e => e.FormaPagamento);
        }
    }
}
