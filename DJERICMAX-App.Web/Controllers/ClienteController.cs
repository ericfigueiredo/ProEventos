using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;

namespace DJERICMAX_App.Web.Controllers
{
    [Route("api/[Controller]")]
    public class ClienteController : Controller
    {
        private readonly IClienteRepositorio _clienteRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;

        public ClienteController(
                                IClienteRepositorio clienteRepositorio,
                                IHttpContextAccessor httpContextAccessor,
                                IHostingEnvironment hostingEnvironment)
        {
            _clienteRepositorio = clienteRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_clienteRepositorio.ObterTodos());

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        //---------------------------------------------------------------------------

        [HttpPost]
        public ActionResult Post([FromBody] Cliente cliente )
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

        //---------------------------------------------------------------------------


    }
}
