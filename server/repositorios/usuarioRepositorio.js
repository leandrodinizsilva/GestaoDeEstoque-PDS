import db from '../database.js'
import jwt from 'jsonwebtoken';

class UsuarioRepositorio{
    constructor(){

    }
    index(){
        var sql = "select * from usuario"

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows);
           });
        });
    }
    add(usuario){
        let validacao = `SELECT * FROM usuario where login = ?`
        let sql = `INSERT INTO usuario (login, nome, senha, tipoUsuario) VALUES (?,?,?,?)`
     
        return new Promise((resolve, reject) => {
            db.all(validacao, [usuario.login], function (err, result){
                if(err)
                    reject(err)
                else{
                    if(result.length > 0)
                        resolve(false)
                    else{
                        db.run(sql, [usuario.login, usuario.nome, usuario.senha, usuario.tipo], function (err, result){
                            if(err)
                                reject(err)
                            else{
                                resolve(true)
                            }
                        })
                    }
                }
            }) 
        })
    }
    login(login){
        let sql = `SELECT * from usuario where login = ? and senha = ?`

        return new Promise((resolve, reject) => {
            db.all(sql, [login.login, login.senha], function (err, rows){
                if(err)
                    reject(err)
                else{
                    if(rows.length > 0){
                        const token = jwt.sign( { id: rows[0].id } , 'f9bf78b9a18ce6d46a0cd2b0b86df9da', {
                            expiresIn: 1000000000
                        });
                        resolve({valido: true, usuario: rows[0], token: token})
                    }
                        
                    else
                        resolve({valido: false, usuario: null, token: null})
                }
            })
        })
    }

    listarTipoUsuario(){
        var sql = "select * from TipoUsuario";

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows);
           });
        });
    }

    getNomeUsuario(id) {
        var sql = "SELECT nome FROM usuario WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows[0]);
           });
        });
    }
}

export default UsuarioRepositorio