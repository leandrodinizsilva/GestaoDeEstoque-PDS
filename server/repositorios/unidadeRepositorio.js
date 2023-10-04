import db from '../database.js'

class UnidadeRepositorio{
    constructor(){

    }
    index(usuarioId){
        var sql = "select * from Unidade where usuarioId = ?"

        return new Promise((resolve, reject) => {
            db.all(sql, [usuarioId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
           });
        })
    }
    add(unidade){
        let sql = `INSERT INTO Unidade (nome, usuarioId) VALUES (?,?)`
 
        return new Promise((resolve, reject) => {
            db.run(sql, [unidade.nome, unidade.usuarioId], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            })  
        }) 
    }
    delete(id){
        let sql = `DELETE FROM Unidade WHERE id = ?`

        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            })
        })   
    }
    update(unidade){
        let sql = `UPDATE Unidade SET nome = ? where id = ?`
     
        return new Promise((resolve, reject) => {
            db.run(sql, [unidade.nome, unidade.id], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            }) 
        })  
    }
    carregarRegistro(id){
        let sql = `SELECT * FROM Unidade WHERE id = ?`
  
        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err)
                } 
                resolve(rows[0])
            });
        })
    }
}

export default UnidadeRepositorio