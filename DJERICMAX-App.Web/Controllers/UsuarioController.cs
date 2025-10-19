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
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;

        public UsuarioController(
                                IUsuarioRepositorio usuarioRepositorio,
                                IHttpContextAccessor httpContextAccessor,
                                IHostingEnvironment hostingEnvironment)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var usuarios = _usuarioRepositorio.ObterTodos();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //---------------------------------------------------------------------------

        [HttpPost("VerificarUsuario")]
        public ActionResult VerificarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioRetorno = _usuarioRepositorio.Obter(usuario.Email, usuario.Senha);

                if (usuarioRetorno != null)
                {
                    return Ok(usuarioRetorno);
                }
                return BadRequest("Usuário ou senha inválidos");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        //---------------------------------------------------------------------------

        // POST: api/usuario - Criar ou atualizar usuario
        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            try

            {
                usuario.Validate();
                if (!usuario.EhValido)
                {
                    return BadRequest(usuario.ObterMensagensValidacao());
                }

                if (usuario.Id > 0)
                {
                    _usuarioRepositorio.Atualizar(usuario);
                }
                else
                {
                    _usuarioRepositorio.Adicionar(usuario);
                }

                return Created("api/usuario", usuario);
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
                var pastaArquivos = _hostingEnvironment.WebRootPath + "\\ftsUsuarios\\";
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
            var arrayNomeCompacto = Path.GetFileNameWithoutExtension(nomeArquivo).Take(7).ToArray();
            var novoNomeArquivo = new string(arrayNomeCompacto).Replace(" ", "-");
            novoNomeArquivo = $"{novoNomeArquivo}_{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}.{extensao}";
            return novoNomeArquivo;
        }

        //---------------------------------------------------------------------------

        // POST: api/cliente/deletar - Excluir cliente
        [HttpPost("deletar")]
        public IActionResult Deletar([FromBody] Usuario usuario)
        {
            try
            {
                _usuarioRepositorio.Remover(usuario);
                return Ok(_usuarioRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

    }
}
