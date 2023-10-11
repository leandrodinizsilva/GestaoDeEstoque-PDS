import MaterialRepositorio from "../repositorios/materialRepositorio.js";
import Material from '../entidades/material.js';

const materialRepositorio = new MaterialRepositorio

class MaterialController{
    constructor(){

    }
    index(req, res){
        let depositoId = req.body.depositoId

        let promise = materialRepositorio.index(depositoId)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    add(req, res){
        let material = new Material(null, req.body.nome, req.body.unidadeId, req.body.preco)

        let promise = materialRepositorio.add(material)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    delete(req, res){
        let id = req.body.id
        
        let promise = materialRepositorio.delete(id)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    update(req, res){
        let material = new Material(req.body.id, req.body.nome, req.body.unidadeId, req.body.preco)

        let promise = materialRepositorio.update(material)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    carregarRegistro(req, res){
        let id = req.body.id

        let promise = materialRepositorio.carregarRegistro(id)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    carregarUnidadeMaterial(req, res){
        let id = req.body.id

        let promise = materialRepositorio.carregarUnidadeMaterial(id)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
}

export default MaterialController