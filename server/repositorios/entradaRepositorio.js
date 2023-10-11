import db from '../database.js'

class EntradaRepositorio{
    constructor(){

    }
    carregarEntradas(usuarioId){
        var sql = "SELECT * FROM Entrada where usuarioId = ? "
    
        return new Promise((resolve, reject) => {
            db.all(sql, [usuarioId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                 resolve(rows)
           });
        })
    }
    index(usuarioId){
        var sql = "select E.id as id, E.data as data, E.quantidade as quantidade, M.nome as nomeMaterial, D.nome as nomeDeposito, U.nome as nomeUnidade from Entrada as E right join Material as M on M.id = E.materialId right join Deposito as D on D.id = E.depositoId right join Unidade as U on M.unidadeId = U.id where E.usuarioId = ? ORDER BY E.data DESC "
    
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
    async delete(id){
        let sql = `DELETE FROM entrada WHERE id = ?`
        
        let entrada = await this.carregarRegistro(id)
        var quantidadeSaida = await this.carregarQuantidadeSaidaDoMaterial(entrada.materialId)
        var quantidadeEntrada = await this.carregarQuantidadeEntradaDoMaterial(entrada.materialId)
        quantidadeEntrada = quantidadeEntrada - entrada.quantidade
	
        return new Promise((resolve, reject) => {
            if(quantidadeEntrada < quantidadeSaida){
                reject({"message": "Quantidade de saida é superior ao montante de entrada."})
                return
            }
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
    deleteTodasEntradasDoMaterial(materialId){
        let sql = `DELETE FROM entrada WHERE materialId = ?`
        
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
    carregarQuantidadeSaidaDoMaterial(materialId){
        let sql = `SELECT SUM(quantidade) as quantidade from saida where materialId = ?`
        
        return new Promise((resolve, reject) => {
            db.all(sql, [materialId], function (err, result){ 
                if(err)
                    reject(err)
                else{
                    resolve(result[0].quantidade)
                }
            }) 
        })  
    }
    carregarQuantidadeEntradaDoMaterial(materialId){
        let sql = `SELECT SUM(quantidade) as quantidade from Entrada where materialId = ?`
        
        return new Promise((resolve, reject) => {
            db.all(sql, [materialId], function (err, result){ 
                if(err)
                    reject(err)
                else{
                    resolve(result[0].quantidade)
                }
            }) 
        })  
    }
}

export default EntradaRepositorio