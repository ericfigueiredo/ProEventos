using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DJERICMAX_App.Web.Controllers
{
    [Route("api/[controller]")]
    public class ClienteController : Controller
    {
        private readonly IClienteRepositorio _clienteRepositorio;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ClienteController(
            IClienteRepositorio clienteRepositorio,
            IHttpContextAccessor httpContextAccessor,
            IHostingEnvironment hostingEnvironment)
        {
            _clienteRepositorio = clienteRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        // -----------------------------------------------------------------------
        // GET: api/cliente - Todos os clientes SEM eventos
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var clientes = _clienteRepositorio.ObterTodos(); // genérico
                return Ok(clientes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // -----------------------------------------------------------------------
        // GET: api/cliente/com-eventos - Todos os clientes COM eventos (completo)
        [HttpGet("com-eventos")]
        public IActionResult GetComEventos()
        {
            try
            {
                // usa método específico do ClienteRepositorio (com ThenInclude)
                var clientes = _clienteRepositorio.ObterTodosComEventos();
                return Ok(clientes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // -----------------------------------------------------------------------
        // GET: api/cliente/5 - Cliente específico SEM eventos
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var cliente = _clienteRepositorio.ObterPorId(id); // genérico
                if (cliente == null) return NotFound();
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // -----------------------------------------------------------------------
        // GET: api/cliente/5/completo - Cliente específico COM eventos
        [HttpGet("{id}/completo")]
        public IActionResult GetCompleto(int id)
        {
            try
            {
                // usa método específico do ClienteRepositorio (com ThenInclude)
                var cliente = _clienteRepositorio.ObterClienteComEventos(id);
                if (cliente == null) return NotFound();
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // -----------------------------------------------------------------------
        // POST: api/cliente - Criar ou atualizar cliente
        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            try
            
            {
                cliente.Validate();
                if (!cliente.EhValido)
                {
                    return BadRequest(cliente.ObterMensagensValidacao());
                }

                if (cliente.Id > 0)
                {
                    _clienteRepositorio.Atualizar(cliente);
                }
                else
                {
                    _clienteRepositorio.Adicionar(cliente);
                }

                return Created("api/cliente", cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        // -----------------------------------------------------------------------
        // POST: api/cliente/deletar - Excluir cliente
        [HttpPost("deletar")]
        public IActionResult Deletar([FromBody] Cliente cliente)
        {
            try
            {
                _clienteRepositorio.Remover(cliente);
                return Ok(_clienteRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
