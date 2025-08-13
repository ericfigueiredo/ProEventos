using DJERICMAX_App.Dominio.Contratos;
using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Repositorio.Repositorios;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;

namespace DJERICMAX_App.Web.Controllers
{
    [Route("api/[Controller]")]
    public class ServicoController : Controller
    {
        private readonly IServicoRepositorio _servicoRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public ServicoController(IServicoRepositorio servicoRepositorio,
                                    IHttpContextAccessor httpContextAccessor,
                                    IHostingEnvironment hostingEnvironment)
        {
            _servicoRepositorio = servicoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

//---------------------------------------------------------------------------
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_servicoRepositorio.ObterTodos());
                
            }catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

//---------------------------------------------------------------------------

        [HttpPost]
        public IActionResult Post([FromBody]Servico servico)
        {
            try
            {
                servico.Validate();
                if (!servico.EhValido)
                {
                    return BadRequest(servico.ObterMensagensValidacao());
                }
                if (servico.Id > 0)
                {
                    _servicoRepositorio.Atualizar(servico);
                }
                else
                {
                _servicoRepositorio.Adicionar(servico);
                }
                return Created("api/servico", servico);
            }catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

//---------------------------------------------------------------------------

        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] Servico servico)
        {
            try
            {
                // serviço recebido no FromBody deve ter a propriedade Id > 0
                _servicoRepositorio.Remover(servico);
                return Json(_servicoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

//---------------------------------------------------------------------------

        [HttpPost("EnviarArquivo")]
        public IActionResult EnviarArquivo()
        {
            try
            {
                var formFile = _httpContextAccessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                var nomeArquivo = formFile.FileName;
                var extensao = nomeArquivo.Split(".").Last();
                string novoNomeArquivo = GerarNovoNomeArquivo(nomeArquivo, extensao);

                var pastaArquivos = _hostingEnvironment.WebRootPath + "\\arquivos\\";
                var nomeCompleto = pastaArquivos + novoNomeArquivo;

                using (var streamArquivo = new FileStream(nomeCompleto, FileMode.Create))
                {
                    formFile.CopyTo(streamArquivo);
                }

                return Json(novoNomeArquivo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        private static string GerarNovoNomeArquivo(string nomeArquivo, string extensao)
        {
            var arrayNomeCompacto = Path.GetFileNameWithoutExtension(nomeArquivo).Take(10).ToArray();
            var novoNomeArquivo = new string(arrayNomeCompacto).Replace(" ", "-");
            novoNomeArquivo = $"{novoNomeArquivo}_{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}.{extensao}";
            return novoNomeArquivo;
        }
    }
}
