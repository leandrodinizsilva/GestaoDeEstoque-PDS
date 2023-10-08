import index from '../index.js'
import SaidaRepositorio from '../repositorios/saidaRepositorio.js';
import Saida from '../entidades/saida.js'

const saidaRepositorio = new SaidaRepositorio


class SaidaController{
    constructor(){

    }
    index(req, res){
        let promise = saidaRepositorio.index(index.usuarioId())
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    async add(req, res){
        let saida = new Saida(null, req.body.materialId, req.body.depositoId, req.body.quantidade, req.body.data, index.usuarioId()) 

        let promise = saidaRepositorio.add(saida)
        await promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    delete(req, res){
        let id = req.body.id
        
        let promise = saidaRepositorio.delete(id)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    update(req, res){
        let saida = new Saida(req.body.id, req.body.materialId, req.body.depositoId, req.body.quantidade, req.body.data, index.usuarioId())
        
        let promise = saidaRepositorio.update(saida)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });  
    }
    carregarRegistro(req, res){
        let id = req.body.id

        let promise = saidaRepositorio.carregarRegistro(id)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
}

export default SaidaController