using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace DJERICMAX_App.Web.Controllers
{
    [Route("api/[Controller]")]
    public class EventoController : Controller
    {
        private readonly IEventoRepositorio _eventoRepositorio;

        public EventoController(IEventoRepositorio eventoRepositorio)
        {
            _eventoRepositorio = eventoRepositorio;
        }

        //---------------------------------------------------------------------------
        // GET: api/evento - Todos os eventos SEM clientes (usa o método base)
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var eventos = _eventoRepositorio.ObterTodosCompletos(); // ✅ inclui Cliente, FormaPagamento e ItensPedido/Serviço
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var evento = _eventoRepositorio.ObterEventoCompleto(id);
                if (evento == null) return NotFound();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------

        [HttpPost("cadastrar")]
        public IActionResult Post([FromBody] Evento evento)
        {
            try
            {
                evento.Validate();
                if (!evento.EhValido)
                    return BadRequest(evento.ObterMensagensValidacao());

                var eventoExistente = _eventoRepositorio.ObterEventoCompleto(evento.Id);

                if (eventoExistente != null)
                {
                    // Atualiza propriedades simples
                    eventoExistente.NomeEvento = evento.NomeEvento;
                    eventoExistente.HoraInicio = evento.HoraInicio;
                    eventoExistente.HoraFinal = evento.HoraFinal;
                    eventoExistente.DataCadastro = evento.DataCadastro;
                    eventoExistente.DataContrato = evento.DataContrato;
                    eventoExistente.DataEvento = evento.DataEvento;
                    eventoExistente.Convidados = evento.Convidados;
                    eventoExistente.Pacote = evento.Pacote;
                    eventoExistente.Observacoes = evento.Observacoes;
                    eventoExistente.Parcelado = evento.Parcelado;
                    eventoExistente.QtdeParcelas = evento.QtdeParcelas;
                    eventoExistente.ValorParcelas = evento.ValorParcelas;
                    eventoExistente.LogradouroEvento = evento.LogradouroEvento;
                    eventoExistente.NumLogradouroEvento = evento.NumLogradouroEvento;
                    eventoExistente.BairroEvento = evento.BairroEvento;
                    eventoExistente.CidadeEvento = evento.CidadeEvento;
                    eventoExistente.UfEvento = evento.UfEvento;
                    eventoExistente.CepEvento = evento.CepEvento;
                    eventoExistente.Proposta = evento.Proposta;
                    eventoExistente.Fechado = evento.Fechado;
                    eventoExistente.Realizado = evento.Realizado;
                    eventoExistente.Cancelado = evento.Cancelado;

                    // Substitui itens de pedido e parcelas
                    eventoExistente.ItensPedido = evento.ItensPedido;
                    eventoExistente.Parcelas = evento.Parcelas;

                    _eventoRepositorio.Atualizar(eventoExistente);
                }
                else
                {
                    _eventoRepositorio.Adicionar(evento);
                }

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //---------------------------------------------------------------------------
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var evento = _eventoRepositorio.ObterPorId(id);
                if (evento == null) return NotFound();

                _eventoRepositorio.Remover(evento);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //---------------------------------------------------------------------------
        [HttpPut("{eventoId}/parcelas/{parcelaId}/pagar")]
        public IActionResult MarcarParcelaComoPaga(int eventoId, int parcelaId)
        {
            try
            {
                var evento = _eventoRepositorio.ObterEventoCompleto(eventoId);
                if (evento == null) return NotFound("Evento não encontrado.");

                var parcela = evento.Parcelas.FirstOrDefault(p => p.Id == parcelaId);
                if (parcela == null) return NotFound("Parcela não encontrada.");

                if (!parcela.Pago)
                {
                    parcela.Pago = true;
                    _eventoRepositorio.Atualizar(evento);
                }
                return Ok(parcela);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //---------------------------------------------------------------------------
        // Alterar data de vencimento
        [HttpPut("{eventoId}/parcelas/{parcelaId}/data")]
        public IActionResult AlterarDataVencimento(int eventoId, int parcelaId, [FromBody] DateTime novaData)
        {
            return Ok();
        }
        //---------------------------------------------------------------------------
        // Alterar valor de parcela (redistribui o restante automaticamente)
        [HttpPut("{eventoId}/parcelas/{parcelaId}/valor")]
        public IActionResult AlterarValorParcela(int eventoId, int parcelaId, [FromBody] decimal novoValor)
        {
            return Ok();
        }


    }
}