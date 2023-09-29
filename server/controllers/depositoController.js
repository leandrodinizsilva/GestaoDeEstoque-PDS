import db from '../database.js'
import index from '../index.js'

class DepositoController{
    constructor(){

    }
    index(req, res){
        var sql = "select * from deposito where usuarioId = ?"
        var usuarioId = index.usuarioId()

        db.all(sql, [usuarioId], (err, rows) => {
            if (err) {
                res.status(400).json({"mensagem":err.message});
                return;
            }
            res.json(rows)
       });
    }
    add(req, res){
        let sql = `INSERT INTO deposito (nome, usuarioId) VALUES (?,?)`
        let nome = req.body.nome
        let usuarioId = index.usuarioId()

     
        db.run(sql, [nome, usuarioId], function (err, result){ 
            if(err)
                throw err
            else{
                res.json("")
            }
        })   
    }
    delete(req, res){
        let sql = `DELETE FROM deposito WHERE id = ?`
        let id = req.body.id
     
        db.run(sql, [id], function (err, result){ 
            if(err)
                throw err
            else{
                res.json("")
            }
        })   
    }
    update(req, res){
        let sql = `UPDATE deposito SET nome = ? where id = ?`
        let nome = req.body.nome
        let id = req.body.id
     
        db.run(sql, [nome, id], function (err, result){ 
            if(err)
                throw err
            else{
                res.json("")
            }
        })   
    }
    carregarRegistro(req, res){
        let sql = `SELECT * FROM deposito WHERE id = ?`
        let id = req.body.id
        db.all(sql, [id], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send({message: err.message});
            } else {
                res.status(200).send(rows);
            }
        });
    }
}

export default DepositoController