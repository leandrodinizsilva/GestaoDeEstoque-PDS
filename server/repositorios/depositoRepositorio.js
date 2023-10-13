import db from '../database.js'
import MaterialRepositorio from './materialRepositorio.js';

const materialRepositorio = new MaterialRepositorio

class DepositoRepositorio{
    constructor(){

    }
    index(usuarioId){
        var sql = "select * from deposito where usuarioId = ?"
    
        return new Promise((resolve, reject) => {
            db.all(sql, [usuarioId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
           });
        })
    }
    listarMaterialDoEstoque(depositoId){
        var sqlSaidas = "SELECT SUM(s.quantidade) FROM Saida WHERE e.depositoId = ? GROUP BY s.materialId";
        var sql = "SELECT e.materialId, m.nome, u.nome AS nomeUnidade, "
                + "(SUM(e.quantidade) - COALESCE(SUM(s.quantidade), 0)) AS quantidade FROM Entrada AS e "
                + "LEFT JOIN Material AS m ON e.materialId = m.id "
                + "LEFT JOIN Saida AS s ON s.materialId = e.materialId "
                + "LEFT JOIN Unidade AS u ON m.unidadeId = u.id "
                + "WHERE e.depositoId = ? GROUP BY e.materialId";

        return new Promise((resolve, reject) => {
            db.all(sql, [depositoId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
           });
        })
    }
    add(deposito){
        let sql = `INSERT INTO deposito (nome, usuarioId) VALUES (?,?)`

        return new Promise((resolve, reject) => {
            db.all(sql, [deposito.nome, deposito.usuarioId], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
            }) 
        })
    }
    async delete(id){
        let sql = `DELETE FROM deposito WHERE id = ?`
        
        await materialRepositorio.deleteTodosMateriaisDoDeposito(id)
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
    update(deposito){
        let sql = `UPDATE deposito SET nome = ? where id = ?`

        return new Promise((resolve, reject) => {
            db.all(sql, [deposito.nome, deposito.id], function (err, result){ 
                if(err)
                    reject(err)
                else
                    resolve("")
            }) 
        })  
    }
    carregarRegistro(id){
        let sql = `SELECT * FROM deposito WHERE id = ?`
       
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

export default DepositoRepositorio