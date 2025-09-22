using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DJERICMAX_App.Web.Controllers
{
    [Route("api/[Controller]")]
    public class PedidoController : Controller
    {
        private readonly IPedidoRepositorio _pedidoRepositorio;

        public PedidoController(IPedidoRepositorio pedidoRepositorio)
        {
            _pedidoRepositorio = pedidoRepositorio;
        }

        //---------------------------------------------------------------------------
        // GET: api/pedido - Todos os pedidos SEM eventos (usa o método base)
        /*  [HttpGet]
          public IActionResult Get()
          {
              try
              {
                  var pedidos = _pedidoRepositorio.ObterTodos(); // Método da interface base
                  return Ok(pedidos); // Use Ok() em vez de Json()
              }
              catch (Exception ex)
              {
                  return BadRequest(ex.Message);
              }
          } */

        //---------------------------------------------------------------------------
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                // Usar o método com eager loading completo
                return Ok(_pedidoRepositorio.ObterTodosCompletos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------
        [HttpGet("basico")]
        public IActionResult GetBasico()
        {
            try
            {
                // Alternativa: apenas com itens básicos
                return Ok(_pedidoRepositorio.ObterTodosComItens());
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
                var pedido = _pedidoRepositorio.ObterPedidoCompleto(id);
                if (pedido == null) return NotFound();

                return Ok(pedido);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------
        [HttpGet("{id}/basico")]
        public IActionResult GetBasico(int id)
        {
            try
            {
                var pedido = _pedidoRepositorio.ObterPedidoComItens(id);
                if (pedido == null) return NotFound();

                return Ok(pedido);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------
        [HttpPost]
        public IActionResult Post([FromBody] Pedido pedido)
        {
            try
            {
                pedido.Validate();
                if (!pedido.EhValido)
                {
                    return BadRequest(pedido.ObterMensagensValidacao());
                }

                if (pedido.Id > 0)
                {
                    _pedidoRepositorio.Atualizar(pedido);
                }
                else
                {
                    _pedidoRepositorio.Adicionar(pedido);
                }

                return Ok(pedido);
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
                var pedido = _pedidoRepositorio.ObterPorId(id);
                if (pedido == null) return NotFound();

                _pedidoRepositorio.Remover(pedido);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}