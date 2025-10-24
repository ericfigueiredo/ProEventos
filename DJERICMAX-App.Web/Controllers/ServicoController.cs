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
    [Route("api/[controller]")]
    [ApiController]
    public class ServicoController : ControllerBase
    {
        private readonly IServicoRepositorio _servicoRepositorio;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ServicoController(
            IServicoRepositorio servicoRepositorio,
            IHttpContextAccessor httpContextAccessor,
            IHostingEnvironment hostingEnvironment)
        {
            _servicoRepositorio = servicoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        // ---------------------------------------------------------------------------
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var servicos = _servicoRepositorio.ObterTodos();
                return Ok(servicos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var servico = _servicoRepositorio.ObterServicoComItensPedido(id);
                if (servico == null)
                    return NotFound(new { mensagem = "Serviço não encontrado." });

                return Ok(servico);
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
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

                // --- Atualização ---
                if (servico.Id > 0)
                {
                    // Busca o serviço atual do banco SEM rastrear
                    var servicoExistente = _servicoRepositorio.ObterServicoComItensPedido(servico.Id);

                    if (servicoExistente == null)
                        return NotFound(new { mensagem = "Serviço não encontrado." });

                    // Desanexa os itens antigos (para evitar tracking duplicado)
                    foreach (var item in servicoExistente.ItensPedido.ToList())
                    {
                        _servicoRepositorio.Detach(item);
                    }

                    // Atualiza apenas os dados necessários
                    _servicoRepositorio.Atualizar(servico);
                }
                // --- Inserção ---
                else
                {
                    _servicoRepositorio.Adicionar(servico);
                }

                return Ok(servico);
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var servico = _servicoRepositorio.ObterPorId(id);
                if (servico == null)
                    return NotFound(new { mensagem = "Serviço não encontrado." });

                _servicoRepositorio.Remover(servico);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
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
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
        // UPLOAD TEMPORÁRIO
        [HttpPost("EnviarArquivoTemporario")]
        public IActionResult EnviarArquivoTemporario()
        {
            try
            {
                var formFile = _httpContextAccessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                if (formFile == null || formFile.Length == 0)
                    return BadRequest(new { mensagem = "Arquivo não enviado." });

                var extensao = Path.GetExtension(formFile.FileName);
                var nomeBase = Path.GetFileNameWithoutExtension(formFile.FileName).Take(10).ToArray();
                var nomeCompacto = new string(nomeBase).Replace(" ", "-");
                var novoNomeArquivo = $"{nomeCompacto}_{DateTime.Now:yyyyMMddHHmmss}{extensao}";

                var pastaTemp = Path.Combine(_hostingEnvironment.WebRootPath, "arquivos_temp");
                if (!Directory.Exists(pastaTemp))
                    Directory.CreateDirectory(pastaTemp);

                var caminhoCompleto = Path.Combine(pastaTemp, novoNomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    formFile.CopyTo(stream);
                }

                return Ok(new { arquivo = novoNomeArquivo });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
        // CONFIRMAR IMAGEM (move temp → final e remove antiga)
        [HttpPost("ConfirmarImagem")]
        public IActionResult ConfirmarImagem([FromBody] ConfirmarImagemDto dados)
        {
            try
            {
                var imagemNova = dados.ImagemNova;
                var imagemAntiga = dados.ImagemAntiga;

                var pastaTemp = Path.Combine(_hostingEnvironment.WebRootPath, "arquivos_temp");
                var pastaFinal = Path.Combine(_hostingEnvironment.WebRootPath, "arquivos");

                if (!Directory.Exists(pastaFinal))
                    Directory.CreateDirectory(pastaFinal);

                var caminhoTemp = Path.Combine(pastaTemp, imagemNova);
                var caminhoFinal = Path.Combine(pastaFinal, imagemNova);

                if (System.IO.File.Exists(caminhoTemp))
                {
                    if (System.IO.File.Exists(caminhoFinal))
                        System.IO.File.Delete(caminhoFinal);

                    System.IO.File.Move(caminhoTemp, caminhoFinal);
                }

                if (!string.IsNullOrEmpty(imagemAntiga))
                {
                    var caminhoAntigo = Path.Combine(pastaFinal, imagemAntiga);
                    if (System.IO.File.Exists(caminhoAntigo))
                        System.IO.File.Delete(caminhoAntigo);
                }

                return Ok();
                //return Json(novoNomeArquivo);
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
        [HttpPost("CancelarImagem")]
        public IActionResult CancelarImagem([FromBody] string nomeArquivo)
        {
            try
            {
                var caminhoTemp = Path.Combine(_hostingEnvironment.WebRootPath, "arquivos_temp", nomeArquivo);
                if (System.IO.File.Exists(caminhoTemp))
                {
                    System.IO.File.Delete(caminhoTemp);
                    return Ok(new { mensagem = "Imagem temporária removida." });
                }

                return NotFound(new { mensagem = "Arquivo temporário não encontrado." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        // ---------------------------------------------------------------------------
        [HttpDelete("RemoverArquivo/{nomeArquivo}")]
        public IActionResult RemoverArquivo(string nomeArquivo)
        {
            try
            {
                var caminho = Path.Combine(_hostingEnvironment.WebRootPath, "arquivos", nomeArquivo);

                if (System.IO.File.Exists(caminho))
                {
                    System.IO.File.Delete(caminho);
                    return Ok(new { mensagem = "Arquivo removido com sucesso." });
                }

                return NotFound(new { mensagem = "Arquivo não encontrado." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }
    }
}



















/*
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
                } *
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
                var extensao = nomeArquivo.Split(".").Last();
                string novoNomeArquivo = GerarNovoNomeArquivo(nomeArquivo, extensao);
                var pastaArquivos = _hostingEnvironment.WebRootPath + "\\arquivos\\";
                if (!Directory.Exists(pastaArquivos))
                    Directory.CreateDirectory(pastaArquivos);
                var nomeCompleto = pastaArquivos + novoNomeArquivo;
                using (var streamArquivo = new FileStream(nomeCompleto, FileMode.Create))
                {
                    formFile.CopyTo(streamArquivo);
                }
                // return Ok(new { nomeArquivo = novoNomeArquivo });
                return Json(novoNomeArquivo);
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
        //---------------------------------------------------------------------------
        [HttpDelete("servico/remover-arquivo/{nomeArquivo}")]
        public IActionResult RemoverArquivo(string nomeArquivo)
        {
            var caminho = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", nomeArquivo);

            if (System.IO.File.Exists(caminho))
            {
                System.IO.File.Delete(caminho);
                return Ok("Arquivo removido com sucesso.");
            }

            return NotFound("Arquivo não encontrado.");
        }

    }
}



*/