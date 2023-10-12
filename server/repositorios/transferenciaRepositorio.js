import db from '../database.js'

class TransferenciaRepositorio{
    constructor(){

    }
    index(usuarioId){
        var sql = "select T.id as id, T.data as data, D1.nome as nomeDepositoOrigem, D2.nome as nomeDepositoDestino, M.nome as nomeMaterial, T.quantidade as quantidade, U.nome as nomeUnidade from transferencia as T right join deposito as D1 on T.depositoOrigemId = D1.id right join Deposito as D2 on T.depositoDestinoId = D2.id right join Material as M on T.materialId = M.id right join Unidade as U on M.unidadeId = U.id where T.usuarioId = ?"
    
        return new Promise((resolve, reject) => {
            db.all(sql, [usuarioId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                 resolve(rows)
           });
        })
    }
    add(transferencia){
        let sql = `INSERT INTO transferencia (materialId, depositoOrigemId, depositoDestinoId, quantidade, data, usuarioId) VALUES (?,?,?,?,?,?)`

        return new Promise((resolve, reject) => {
            db.all(sql, [transferencia.materialId, transferencia.depositoOrigemId, transferencia.depositoDestinoId, transferencia.quantidade, transferencia.data, transferencia.usuarioId], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            }) 
        })
    }
    async delete(id){
        let sql = `DELETE FROM transferencia WHERE id = ?`
	
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
    update(transferencia){
        let sql = `UPDATE transferencia SET materialId = ?, depositoOrigemId = ?, depositoDestinoId = ?, quantidade = ?, data = ?, usuarioId = ? where id = ?`

        return new Promise((resolve, reject) => {
            db.all(sql, [transferencia.materialId, transferencia.depositoOrigemId, transferencia.depositoDestinoId, transferencia.quantidade, transferencia.data, transferencia.usuarioId, transferencia.id], function (err, result){ 
                if(err)
                    reject(err)
                else
                    resolve("")
            }) 
        })  
    }
    carregarRegistro(id){
        let sql = `SELECT * FROM transferencia WHERE id = ?`
       
        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows[0])
            });
        })
    }
    carregarDepositosDestino(idDepositoOrigem){
        let sql = `SELECT * FROM deposito where id != ?`

        return new Promise((resolve, reject) => {
            db.all(sql, [idDepositoOrigem], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })
    }
}

export default TransferenciaRepositorio