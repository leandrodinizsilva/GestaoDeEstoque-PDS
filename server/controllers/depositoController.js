import index from '../index.js'
import DepositoRepositorio from '../repositorios/depositoRepositorio.js';
import MaterialRepositorio from '../repositorios/materialRepositorio.js';
import Deposito from '../entidades/deposito.js'

const depositoRepositorio = new DepositoRepositorio
const materialRepositorio = new MaterialRepositorio

class DepositoController{
    constructor(){

    }
    index(req, res){
        let promise = depositoRepositorio.index(index.usuarioId())
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    listarMaterialDoEstoque(req, res){
        let id = req.body.codigoDeposito
        let promise = depositoRepositorio.listarMaterialDoEstoque(id)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    listarDepositoPermissao(req, res) {
        let id = req.body.codigoDeposito
        let promise = depositoRepositorio.listarDepositoPermissao(id)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    listarPermissaoDeposito(req, res) {
        let promise = depositoRepositorio.listarPermissaoDeposito()
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    updatePermissao(req,res) {
        let entrada = req.body
        let promise = depositoRepositorio.updatePermissao(entrada)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });  
    }
    add(req, res){
        let deposito = new Deposito(null, req.body.nome, index.usuarioId()) 

        let promise = depositoRepositorio.add(deposito)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    delete(req, res){
        let id = req.body.id
        
        let promise = depositoRepositorio.delete(id)
        promise.then(function (result) { 
            res.json(result)
        }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
    update(req, res){
        let deposito = new Deposito(req.body.id, req.body.nome, index.usuarioId())
        
        let promise = depositoRepositorio.update(deposito)
        promise.then(function (result) { res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });  
    }
    carregarRegistro(req, res){
        let id = req.body.id

        let promise = depositoRepositorio.carregarRegistro(id)
        promise.then(function(result){ res.json(result) }).catch(function (error) { res.status(400).json({"mensagem": error.message}); });
    }
}

export default DepositoController