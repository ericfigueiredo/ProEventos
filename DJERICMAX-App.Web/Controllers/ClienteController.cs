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
        public ActionResult Get()
        {
            try
            {
                return Ok();
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
                var clienteCadastrado = _clienteRepositorio.Obter(cliente.Nome, cliente.Telefone);
                if (clienteCadastrado != null)
                    return BadRequest("Cliente já cadastrado no sistema");

                _clienteRepositorio.Adicionar(cliente);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        //---------------------------------------------------------------------------


    }
}
