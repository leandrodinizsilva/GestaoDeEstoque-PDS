import db from '../database.js'

class SaidaRepositorio{
    constructor(){

    }
    index(usuarioId){
        var sql = "select E.id as id, E.data as data, E.quantidade as quantidade, M.nome as nomeMaterial, D.nome as nomeDeposito from saida as E right join Material as M on M.id = E.materialId right join Deposito as D on D.id = E.depositoId where E.usuarioId = ? "
    
        return new Promise((resolve, reject) => {
            db.all(sql, [usuarioId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                 resolve(rows)
           });
        })
    }
    async add(saida){
        let sql = `INSERT INTO saida (materialId, depositoId, quantidade, data, usuarioId) VALUES (?,?,?,?,?)`

        var quantidadeDisponivel =  await this.carregarQuantidadeDisponivelMaterial(saida.materialId)
        
        return new Promise((resolve, reject) => {
            if(saida.quantidade > quantidadeDisponivel){
                reject({"message": "Quantidade de saida é superior ao montante de entrada."})
                return
            }
            db.all(sql, [saida.materialId, saida.depositoId, saida.quantidade, saida.data, saida.usuarioId], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            }) 
        })
    }
    delete(id){
        let sql = `DELETE FROM saida WHERE id = ?`
        
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
    update(saida){
        let sql = `UPDATE saida SET materialId = ?, depositoId = ?, quantidade = ?, data = ? where id = ?`

        return new Promise((resolve, reject) => {
            db.all(sql, [saida.materialId, saida.depositoId, saida.quantidade, saida.data, saida.id], function (err, result){ 
                if(err)
                    reject(err)
                else
                    resolve("")
            }) 
        })  
    }
    carregarRegistro(id){
        let sql = `SELECT * FROM saida WHERE id = ?`
       
        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows[0])
            });
        })
    }
    deleteTodasSaidasDoMaterial(materialId){
        let sql = `DELETE FROM saida WHERE materialId = ?`
        
        return new Promise((resolve, reject) => {
            db.all(sql, [materialId], function (err){ 
                if(err)
                    reject(err)
                else{
                    resolve("")
                }
            }) 
        }) 
    }
    async carregarQuantidadeDisponivelMaterial(materialId){
        let sql = "select SUM(quantidade) as quantidade from Entrada where materialId = ?"
        let sql2 = "select SUM(quantidade) as quantidade from Saida where materialId = ?"

        var quantidadeEntrada = await new Promise((resolve, reject) => {
            db.all(sql, [materialId], function (err, result){ 
                if(err)
                    reject(err)
                resolve(result[0].quantidade)
            })  
        })
        
        var quantidadeSaida = await new Promise((resolve, reject) => {
            db.all(sql2, [materialId], function (err, result){ 
                if(err)
                    reject(err)
                resolve(result[0].quantidade)
            })  
        })

        return quantidadeEntrada - quantidadeSaida;

    }
}

export default SaidaRepositorio