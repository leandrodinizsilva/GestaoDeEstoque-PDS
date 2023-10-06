import db from '../database.js'

class MaterialRepositorio{
    constructor(){

    }
    index(depositoId){
        var sql = "select M.id as id, M.nome as nome, M.preco as preco, U.nome as nomeUnidade from Material as M right join Unidade as U on M.unidadeId = U.id where depositoId = ?"

        return new Promise((resolve, reject) => {
            db.all(sql, [depositoId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
           });
        })
    }
    add(material){
        let sql = `INSERT INTO Material (nome, unidadeId, preco, depositoId) VALUES (?,?,?,?)`
     
        return new Promise((resolve, reject) => {
            db.run(sql, [material.nome, material.unidadeId, material.preco, material.depositoId], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            })  
        })
    }
    delete(id){
        let sql = `DELETE FROM Material WHERE id = ?`
     
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            })
        })   
    }
    update(material){
        let sql = `UPDATE Material SET nome = ?, unidadeId = ?, preco = ?, depositoId = ? where id = ?`
     
        return new Promise((resolve, reject) => {
            db.run(sql, [material.nome, material.unidadeId, material.preco, material.depositoId, material.id], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            })
        })   
    }
    carregarRegistro(id){
        let sql = `SELECT * FROM Material WHERE id = ?`

        return new Promise((resolve,reject) => {
            db.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err)
                } 
                resolve(rows[0])
            });
        })
    }
    deleteTodosMateriaisDoDeposito(depositoId){
        let sql = `DELETE FROM Material WHERE depositoId = ?`
     
        return new Promise((resolve, reject) => {
            db.run(sql, [depositoId], function (err, result){ 
                if(err)
                    reject(err)
                else
                    resolve("")
            })
        }) 
    }
    temMaterialComEssaUnidade(unidadeId){
        let sql = `SELECT * FROM Material WHERE unidadeId = ?`
     
        return new Promise((resolve, reject) => {
            db.all(sql, [unidadeId], function (err, rows){ 
                if(err)
                    reject(err)
                else{
                    if(rows.length > 0)
                        resolve(true)
                    else
                        resolve(false)
                }             
            })
        }) 
    }
    carregarUnidadeMaterial(id){
        let sql = "select U.nome as unidade from Material as M right join Unidade as U on M.unidadeId = U.id where M.id = ?"

        return new Promise((resolve, reject) => {
            db.all(sql, [id], function (err, rows){ 
                if(err)
                    reject(err)
                resolve(rows[0])
            })  
        })
    }
}

export default MaterialRepositorio