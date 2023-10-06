import db from '../database.js'

class EntradaRepositorio{
    constructor(){

    }
    index(usuarioId){
        var sql = "select E.id as id, E.data as data, E.quantidade as quantidade, M.nome as nomeMaterial, D.nome as nomeDeposito from Entrada as E right join Material as M on M.id = E.materialId right join Deposito as D on D.id = E.depositoId where E.usuarioId = ? "
    
        return new Promise((resolve, reject) => {
            db.all(sql, [usuarioId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
           });
        })
    }
    add(entrada){
        let sql = `INSERT INTO entrada (materialId, depositoId, quantidade, data, usuarioId) VALUES (?,?,?,?,?)`

        return new Promise((resolve, reject) => {
            db.all(sql, [entrada.materialId, entrada.depositoId, entrada.quantidade, entrada.data, entrada.usuarioId], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            }) 
        })
    }
    delete(id){
        let sql = `DELETE FROM entrada WHERE id = ?`
        
        return new Promise((resolve, reject) => {
            db.all(sql, [id], function (err){ 
                if(err)
                    reject(err)
                else{
                    resolve("")
                }
            }) 
        })  
    }
    update(entrada){
        let sql = `UPDATE entrada SET materialId = ?, depositoId = ?, quantidade = ?, data = ? where id = ?`

        return new Promise((resolve, reject) => {
            db.all(sql, [entrada.materialId, entrada.depositoId, entrada.quantidade, entrada.data, entrada.id], function (err, result){ 
                if(err)
                    reject(err)
                else
                    resolve("")
            }) 
        })  
    }
    carregarRegistro(id){
        let sql = `SELECT * FROM entrada WHERE id = ?`
       
        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows[0])
            });
        })
    }
}

export default EntradaRepositorio