import db from '../database.js'

class MaterialController{
    constructor(){

    }
    index(req, res){
        var sql = "select * from Material where depositoId = ?"
        var depositoId = req.body.depositoId

        db.all(sql, [depositoId], (err, rows) => {
            if (err) {
                res.status(400).json({"mensagem":err.message});
                return;
            }
            res.json(rows)
       });
    }
    add(req, res){
        let sql = `INSERT INTO Material (nome, unidadeId, preco, depositoId) VALUES (?,?,?,?)`
        let nome = req.body.nome
        let unidadeId = req.body.unidadeId
        let preco = req.body.preco
        let depositoId = req.body.depositoId
     
        db.run(sql, [nome, unidadeId, preco, depositoId], function (err, result){ 
            if(err)
                throw err
            else{
                res.json("")
            }
        })   
    }
    delete(req, res){
        let sql = `DELETE FROM Material WHERE id = ?`
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
        let sql = `UPDATE Material SET nome = ?, unidadeId = ?, preco = ? where id = ?`
        let nome = req.body.nome
        let id = req.body.id
        let unidadeId = req.body.unidadeId
        let preco = req.body.preco
     
        db.run(sql, [nome, unidadeId, preco, id], function (err, result){ 
            if(err)
                throw err
            else{
                res.json("")
            }
        })   
    }
    carregarRegistro(req, res){
        let sql = `SELECT * FROM Material WHERE id = ?`
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

export default MaterialController