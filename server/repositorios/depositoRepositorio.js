import db from '../database.js'
import MaterialRepositorio from './materialRepositorio.js';
import SaidaRepositorio from './saidaRepositorio.js';

const materialRepositorio = new MaterialRepositorio
const saidaRepositorio = new SaidaRepositorio

class DepositoRepositorio{
    constructor(){

    }
    async index(usuarioId){
        var sql = "SELECT tipoUsuario FROM Usuario WHERE id = ? ";

        let tipoUsuario = await new Promise((resolve, reject) => {
            db.all(sql, [usuarioId] ,(err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows[0].tipoUsuario);

            });
        })

        var sql = "";
        if (tipoUsuario == 3) {
            sql = "SELECT * FROM deposito AS d  ";
        } else {
            var sql = "SELECT * FROM deposito AS d "
            + " INNER JOIN PermissaoUsuarioDeposito AS pud ON d.id = pud.depositoId"
            + " WHERE pud.tipoPermissao != 1 AND pud.usuarioId = "+ usuarioId +"";
        }
        
    
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
           });
        })
    }
    listarMaterialDoEstoque(depositoId){
        var sql = "SELECT materialId, m.nome, u.nome AS nomeUnidade, SUM(quantidade) as quantidade "
        + " FROM ( "
        + " SELECT materialId, quantidade FROM entrada WHERE depositoId = ? "
        + " UNION SELECT materialId, -quantidade FROM saida WHERE depositoId = ? "
        + " UNION SELECT materialId, quantidade FROM Transferencia WHERE depositoDestinoId = ? "
        + " UNION SELECT materialId, -quantidade FROM Transferencia WHERE depositoOrigemId = ? "
        +") AS tt "
        + " LEFT JOIN Material AS m ON tt.materialId = m.id "
        + " LEFT JOIN Unidade AS u ON m.unidadeId = u.id "
        + " GROUP BY materialId;";
        return new Promise((resolve, reject) => {
            db.all(sql, [depositoId, depositoId, depositoId, depositoId], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
           });
        })
    }
    listarDepositoPermissao(depositoId) {
        var sql = "SELECT id, nome, tipoPermissao, COALESCE(descricao, 'Nenhuma') as descricao FROM Usuario AS u "
        + " LEFT JOIN PermissaoUsuarioDeposito AS pud ON u.id = pud.usuarioId "
        + " AND pud.depositoId = ? "
        + " LEFT JOIN TipoPermissaoDeposito AS tpd ON pud.tipoPermissao = tpd.idTipoPermissao ";

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
            db.run(sql, [deposito.nome, deposito.usuarioId], function (err, result){ 
                if(err)
                    reject(err)
                resolve("")
                let sqlPer = `INSERT INTO PermissaoUsuarioDeposito (usuarioId, depositoId, tipoPermissao) VALUES (?,?,?)`;
                db.run(sqlPer, [deposito.usuarioId, this.lastID, 3], function(err, result) {
                    if (err)
                        reject(err)
                    else
                        resolve("")
                })
            }) 
        })
    }
    async delete(id){
        let sql = `DELETE FROM deposito WHERE id = ?`
        
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
    listarPermissaoDeposito() {
        let sql = `SELECT * FROM TipoPermissaoDeposito`;
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })
    }
    updatePermissao(entrada) {
        let sql = "INSERT INTO PermissaoUsuarioDeposito (usuarioId, depositoId, tipoPermissao) "
        + " VALUES (?, ?, ?) ON CONFLICT (usuarioId, depositoId) DO UPDATE SET tipoPermissao = ?";
        return new Promise((resolve, reject) => {
            db.all(sql, [entrada.usuarioId, entrada.depositoId, entrada.permissaoId, entrada.permissaoId], function (err, result){ 
                if(err)
                    reject(err)
                else
                    resolve("")
            }) 
        })  
    }
    async carregarQuantidadesMovimentacoes(depositoId, materialId, datas){
        let result = []

        let sql1 = 'SELECT data, quantidade from entrada where depositoId = ? and materialId = ?'
        let entradas = await new Promise((resolve, reject) => {
            db.all(sql1, [depositoId, materialId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })

        let sql2 = 'SELECT data, -quantidade as quantidade from saida where depositoId = ? and materialId = ?'
        let saidas = await new Promise((resolve, reject) => {
            db.all(sql2, [depositoId, materialId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })

        let sql3 = 'SELECT data, quantidade as quantidade from transferencia where depositoDestinoId = ? and materialId = ?'
        let transferencias = await new Promise((resolve, reject) => {
            db.all(sql3, [depositoId, materialId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })

        for(var i = 0; i < datas.length; i++)
        {
            var entradasAux = entradas.filter((entrada) => new Date(entrada.data) <= new Date(datas[i])).map(entrada => entrada.quantidade)
            var saidasAux = saidas.filter((saida) => new Date(saida.data) <= new Date(datas[i])).map(saida => saida.quantidade)
            var transferenciasAux = transferencias.filter((transferencia) => new Date(transferencia.data) <= new Date(datas[i])).map(transferencia => transferencia.quantidade)

            var total = 0
            
            entradasAux.forEach(entrada => {
                total += entrada
            });

            saidasAux.forEach(saida => {
                total += saida
            });

            transferenciasAux.forEach(transferencia => {
                total += transferencia
            });

            result.push(total)
        }

        return result
    }
    async carregarDatasMovimentacaoDeposito(depositoId){
        let sql1 = "SELECT data from entrada where depositoId = ?"
        let datasEntradas = await new Promise((resolve, reject) => {
            db.all(sql1, [depositoId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        }) 

        let sql2 = "SELECT data from saida where depositoId = ?"
        let datasSaidas = await new Promise((resolve, reject) => {
            db.all(sql2, [depositoId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        }) 

        let sql3 = "SELECT data from transferencia where depositoOrigemId = ? or depositoDestinoId = ?"
        let datasTransferencias = await new Promise((resolve, reject) => {
            db.all(sql3, [depositoId, depositoId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        }) 

        let arr = datasEntradas.concat(datasSaidas).concat(datasTransferencias).map(x => x.data)
        let arr1 = arr.filter((item,index) => arr.indexOf(item) === index).sort((a,b) => { return new Date(a) - new Date(b)});
        var formatado = []
        arr1.forEach(data => {
            var aux = data.split("-")    
            formatado.push(aux[2]+ "/" +aux[1]+ "/" +aux[0].substring(2))    
        })

        return {"datas": formatado}

    }
    async carregarRelatorioMaterialPorData(depositoId, data){

        let materiais = await materialRepositorio.index()
        materiais = materiais.map(({ id, nome }) => ({id, nome}));
        let quantidades = []

        for (let i = 0; i < materiais.length; i++) {
            let quantidade =  0
            quantidade = await this.carregarQuantidadeMaterialPorData(depositoId, materiais[i].id, data)
            quantidades.push(quantidade)
        }

        
        return {"materiais": materiais.map(x => x.nome), "quantidades": quantidades}
    }
    async carregarQuantidadeMaterialPorData(depositoId, materialId, data){

        let quantidade = await saidaRepositorio.carregarQuantidadeDisponivelMaterial({"depositoId": depositoId, "materialId": materialId, "data": '20' + data})

        return quantidade
    }
  
    async carregarDatasMovimentacoes(depositoId, materialId){

        let sql1 = "SELECT data from entrada where depositoId = ? and materialId = ?"
        let datasEntradas = await new Promise((resolve, reject) => {
            db.all(sql1, [depositoId, materialId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })

        let sql2 = "SELECT data from saida where depositoId = ? and materialId = ?"
        let datasSaidas = await new Promise((resolve, reject) => {
            db.all(sql2, [depositoId, materialId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })

        let sql3 = "SELECT data from transferencia where depositoDestinoId = ? or depositoOrigemId = ? and materialId = ?"
        let datasTransferencias = await new Promise((resolve, reject) => {
            db.all(sql3, [depositoId, depositoId, materialId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            });
        })
        
        let arr = datasEntradas.concat(datasSaidas).concat(datasTransferencias).map(x => x.data)
        let arr1 = arr.filter((item,index) => arr.indexOf(item) === index).sort((a,b) => { return new Date(a) - new Date(b)});
        var formatado = []
        arr1.forEach(data => {
            var aux = data.split("-")    
            formatado.push(aux[2]+ "/" +aux[1]+ "/" +aux[0].substring(2))    
        })
        
        return {"datas": arr1, "datasFormatadas": formatado}
    }
    async carregarRelatorioMaterialPorTempo(depositoId, materialId){
        let datas = await this.carregarDatasMovimentacoes(depositoId, materialId)
        let quantidades = await this.carregarQuantidadesMovimentacoes(depositoId, materialId, datas.datas)

        return {"datas": datas.datasFormatadas, "quantidades": quantidades}

    }
}


export default DepositoRepositorio