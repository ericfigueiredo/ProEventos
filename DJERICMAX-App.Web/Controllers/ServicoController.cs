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
        // GET: api/servico - Todos os servicos SEM eventos (usa o método base)
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var servicos = _servicoRepositorio.ObterTodos(); // Método da interface base
                return Ok(servicos); // Use Ok() em vez de Json()
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /*
                [HttpGet]
                public IActionResult Get()
                {
                    try
                    {
                        // Usar o novo método com eager loading
                        return Ok(_servicoRepositorio.ObterTodosComItensPedido());
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                } */
        //---------------------------------------------------------------------------
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var servico = _servicoRepositorio.ObterServicoComItensPedido(id);
                if (servico == null) return NotFound();

                return Ok(servico);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------
        [HttpPost]
        public IActionResult Post([FromBody] Servico servico)
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

                return Ok(servico);
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
                var servico = _servicoRepositorio.ObterPorId(id);
                if (servico == null) return NotFound();

                _servicoRepositorio.Remover(servico);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------
        // MANTER os métodos de upload de arquivo
        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] Servico servico)
        {
            try
            {
                _servicoRepositorio.Remover(servico);
                return Ok(_servicoRepositorio.ObterTodos());
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
                if (formFile == null || formFile.Length == 0)
                    return BadRequest("Arquivo não enviado");

                var nomeArquivo = formFile.FileName;
                var extensao = nomeArquivo.Split('.').Last();
                string novoNomeArquivo = GerarNovoNomeArquivo(nomeArquivo, extensao);

                var pastaArquivos = _hostingEnvironment.WebRootPath + "\\arquivos\\";
                if (!Directory.Exists(pastaArquivos))
                    Directory.CreateDirectory(pastaArquivos);

                var nomeCompleto = Path.Combine(pastaArquivos, novoNomeArquivo);

                using (var streamArquivo = new FileStream(nomeCompleto, FileMode.Create))
                {
                    formFile.CopyTo(streamArquivo);
                }

                return Ok(new { nomeArquivo = novoNomeArquivo });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //---------------------------------------------------------------------------
        private static string GerarNovoNomeArquivo(string nomeArquivo, string extensao)
        {
            var arrayNomeCompacto = Path.GetFileNameWithoutExtension(nomeArquivo).Take(10).ToArray();
            var novoNomeArquivo = new string(arrayNomeCompacto).Replace(" ", "-");
            novoNomeArquivo = $"{novoNomeArquivo}_{DateTime.Now:yyyyMMddHHmmss}.{extensao}";
            return novoNomeArquivo;
        }
    }
}