import index from '../index.js'
import TransferenciaRepositorio from '../repositorios/transferenciaRepositorio.js';
import Transferencia from '../entidades/transferencia.js'

const transferenciaRepositorio = new TransferenciaRepositorio


class TransferenciaController{
    constructor(){

    }
    index(req, res){
        let promise = transferenciaRepositorio.index(index.usuarioId())
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    add(req, res){
        let transferencia = new Transferencia(null, req.body.materialId, req.body.depositoOrigemId, req.body.depositoDestinoId, req.body.data, req.body.quantidade, index.usuarioId()) 

        let promise = transferenciaRepositorio.add(transferencia)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    delete(req, res){
        let id = req.body.id
        
        let promise = transferenciaRepositorio.delete(id)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    update(req, res){
        let transferencia = new Transferencia(req.body.id, req.body.materialId, req.body.depositoOrigemId, req.body.depositoDestinoId, req.body.data, req.body.quantidade, index.usuarioId()) 
        
        let promise = transferenciaRepositorio.update(transferencia)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });  
    }
    carregarRegistro(req, res){
        let id = req.body.id

        let promise = transferenciaRepositorio.carregarRegistro(id)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    carregarDepositosDestino(req, res){
        let idDepositoOrigem = req.body.depositoOrigemId

        let promise = transferenciaRepositorio.carregarDepositosDestino(idDepositoOrigem)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
}

export default TransferenciaController