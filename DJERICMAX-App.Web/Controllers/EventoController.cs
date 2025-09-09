using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using System;

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

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_eventoRepositorio.ObterTodosCompletos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

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

        [HttpPost]
        public IActionResult Post([FromBody] Evento evento)
        {
            try
            {
                evento.Validate();
                if (!evento.EhValido)
                {
                    return BadRequest(evento.ObterMensagensValidacao());
                }

                if (evento.Id > 0)
                {
                    _eventoRepositorio.Atualizar(evento);
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
    }
}