import UsuarioRepositorio from '../repositorios/usuarioRepositorio.js';
import Usuario from '../entidades/usuario.js'
import LoginDTO from '../dtos/loginDTO.js'

const usuarioRepositorio = new UsuarioRepositorio

class UsuarioController{
    constructor(){

    }
    index(req, res){
        let promise = usuarioRepositorio.index()
        promise.then(function(result){ res.json({"data": result }) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });

    }   
    add(req, res){
        let usuario = new Usuario(req.body.nome, req.body.login, req.body.senha, req.body.tipo)
        
        let promise = usuarioRepositorio.add(usuario, res)
        promise.then(function(result){ res.json({"valido": result }) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });   
    }
    login(req, res){
        let loginDTO = new LoginDTO(req.body.login, req.body.senha)
        
        let promise = usuarioRepositorio.login(loginDTO, res);
        promise.then(function(result){ res.json({valido: result.valido, usuario: result.usuario, token: result.token}) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });   
    }
    tipo(req, res){
        let promise = usuarioRepositorio.listarTipoUsuario()
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
}

export default UsuarioController