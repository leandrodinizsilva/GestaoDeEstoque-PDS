import index from '../index.js'
import EntradaRepositorio from '../repositorios/entradaRepositorio.js';
import Entrada from '../entidades/entrada.js'

const entradaRepositorio = new EntradaRepositorio


class EntradaController{
    constructor(){

    
    }
    carregarEntradas(req, res){
        let promise = entradaRepositorio.carregarEntradas(index.usuarioId())
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    index(req, res){
        let promise = entradaRepositorio.index(index.usuarioId())
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    add(req, res){
        let entrada = new Entrada(null, req.body.materialId, req.body.depositoId, req.body.quantidade, req.body.data, index.usuarioId()) 

        let promise = entradaRepositorio.add(entrada)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    delete(req, res){
        let id = req.body.id
        
        let promise = entradaRepositorio.delete(id)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    update(req, res){
        let entrada = new Entrada(req.body.id, req.body.materialId, req.body.depositoId, req.body.quantidade, req.body.data, index.usuarioId())
        
        let promise = entradaRepositorio.update(entrada)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });  
    }
    carregarRegistro(req, res){
        let id = req.body.id

        let promise = entradaRepositorio.carregarRegistro(id)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
}

export default EntradaController