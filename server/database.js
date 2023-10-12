import sqlite3  from 'sqlite3';
import md5 from 'md5';

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')

        db.run(`CREATE TABLE IF NOT EXISTS Unidade (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text,
            usuarioId INTEGER,
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id)  
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Material (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text,
            unidadeId INTEGER,
            preco float,
            FOREIGN KEY (unidadeId) REFERENCES Unidade(id)    
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS Deposito (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text,
            usuarioId INTEGER,
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id)    
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login text UNIQUE,
            senha text,
            nome text
        )`); 

        db.run(`CREATE TABLE IF NOT EXISTS Entrada (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            materialId INTEGER,
            depositoId INTEGER,
            usuarioId INTEGER,
            quantidade float,
            data datetime,
            FOREIGN KEY (materialId) REFERENCES Material(id),
            FOREIGN KEY (depositoId) REFERENCES Deposito(id),
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Saida (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            materialId INTEGER,
            depositoId INTEGER,
            usuarioId INTEGER,
            quantidade float,
            data datetime,
            FOREIGN KEY (materialId) REFERENCES Material(id),
            FOREIGN KEY (depositoId) REFERENCES Deposito(id),
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Transferencia (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            materialId INTEGER,
            depositoOrigemId INTEGER,
            depositoDestinoId INTEGER,
            usuarioId INTEGER,
            data datetime,
            quantidade float,
            FOREIGN KEY (materialId) REFERENCES Material(id),
            FOREIGN KEY (depositoOrigemId) REFERENCES Deposito(id),
            FOREIGN KEY (depositoDestinoId) REFERENCES Deposito(id),
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
        )`);
    }
});


export default db