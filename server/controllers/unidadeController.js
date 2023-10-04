import db from '../database.js'
import index from '../index.js'
import UnidadeRepositorio from '../repositorios/unidadeRepositorio.js';
import Unidade from '../entidades/unidade.js'

const unidadeRepositorio = new UnidadeRepositorio

class UnidadeController{
    constructor(){

    }
    index(req, res){
        let promise = unidadeRepositorio.index(index.usuarioId())
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    add(req, res){
        let unidade = new Unidade(null, req.body.nome, index.usuarioId()) 

        let promise = unidadeRepositorio.add(unidade)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); }); 
    }
    delete(req, res){
        let id = req.body.id
        
        let promise = unidadeRepositorio.delete(id)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });  
    }
    update(req, res){
        let unidade = new Unidade(req.body.id, req.body.nome, index.usuarioId()) 

        let promise = unidadeRepositorio.update(unidade)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });  
    }
    carregarRegistro(req, res){
        let id = req.body.id

        let promise = unidadeRepositorio.carregarRegistro(id)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
}

export default UnidadeController