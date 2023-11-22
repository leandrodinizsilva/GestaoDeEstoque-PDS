import db from '../database.js'

class SaidaRepositorio{
    constructor(){

    }
    index(usuarioId){
        var sql = "select S.id as id, S.data as data, S.quantidade as quantidade, M.nome as nomeMaterial, D.nome as nomeDeposito, U.nome as nomeUnidade from saida as S left join Material as M on M.id = S.materialId left join Deposito as D on D.id = S .depositoId left join Unidade as U on M.unidadeId = U.id where S.usuarioId = ? ORDER BY S.data DESC "
    
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

        var quantidadeDisponivel =  await this.carregarQuantidadeDisponivelMaterial(saida)
        
        return new Promise((resolve, reject) => {
            if(saida.quantidade > quantidadeDisponivel){
                reject({"message": "Quantidade de saida é superior ao montante de entrada."})
                return
            }
            db.run(sql, [saida.materialId, saida.depositoId, saida.quantidade, saida.data, saida.usuarioId], function (err, result){ 
                if(err)
                    reject(err)
                resolve({"id": this.lastID})
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
    async carregarQuantidadeDisponivelMaterial(saida){
        let sql = "select SUM(quantidade) as quantidade from Entrada where materialId = ? and depositoId = ? and data <= ?"
        let sql2 = "select SUM(quantidade) as quantidade from Saida where materialId = ? and depositoId = ? and data <= ?"
        let sql3 = "select SUM(quantidade) as quantidade from Transferencia where materialId = ? and depositoDestinoId = ? and data <= ?"
        let sql4 = "select SUM(quantidade) as quantidade from Transferencia where materialId = ? and depositoOrigemId = ? and data <= ?"

        var quantidadeEntrada = await new Promise((resolve, reject) => {
            db.all(sql, [saida.materialId, saida.depositoId, saida.data], function (err, result){ 
                if(err)
                    reject(err)
                resolve(result[0].quantidade)
            })  
        })
        
        var quantidadeSaida = await new Promise((resolve, reject) => {
            db.all(sql2, [saida.materialId, saida.depositoId, saida.data], function (err, result){ 
                if(err)
                    reject(err)
                resolve(result[0].quantidade)
            })  
        })

        var quantidadeTransferenciaEntrando = await new Promise((resolve, reject) => {
            db.all(sql3, [saida.materialId, saida.depositoId, saida.data], function (err, result){ 
                if(err)
                    reject(err)
                resolve(result[0].quantidade)
            })  
        })

        var quantidadeTransferenciaSaindo = await new Promise((resolve, reject) => {
            db.all(sql4, [saida.materialId, saida.depositoId, '20' + saida.data], function (err, result){ 
                if(err)
                    reject(err)
                resolve(result[0].quantidade)
            })  
        })

        return quantidadeEntrada - quantidadeSaida + quantidadeTransferenciaEntrando - quantidadeTransferenciaSaindo;

    }
}

export default SaidaRepositorio