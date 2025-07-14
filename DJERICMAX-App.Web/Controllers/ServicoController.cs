using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Repositorios;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DJERICMAX_App.Web.Controllers
{
    [Route("api/[Controller]")]
    public class ServicoController : Controller
    {
        private readonly IServicoRepositorio _servicoRepositorio;
        public ServicoController(IServicoRepositorio servicoRepositorio)
        {
            _servicoRepositorio = servicoRepositorio;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_servicoRepositorio.ObterTodos());
                //if (condicao == false)
                //{
                //    return BadRequest("")
                //}
            }catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Servico servico)
        {
            try
            {
                _servicoRepositorio.Adicionar(servico);
                return Created("api/servico", servico);
            }catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
