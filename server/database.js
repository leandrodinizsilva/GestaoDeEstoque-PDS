import sqlite3  from 'sqlite3';
import md5 from 'md5';

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS Card (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo text NOT NULL, 
            descricao text,
            autorId INTEGER,
            colunaId INTEGER,
            FOREIGN KEY (autorId) REFERENCES Autor(id)
            FOREIGN KEY (colunaId) REFERENCES Coluna(id)
            )`,
        );

        db.run(`CREATE TABLE IF NOT EXISTS Autor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text,
            email text,
            usuarioId INTEGER,
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
        )`); 

        db.run(`CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login text UNIQUE,
            senha text,
            nome text
        )`); 

        db.run(`CREATE TABLE IF NOT EXISTS Board (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text,
            usuarioId INTEGER,
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
        )`); 

        db.run(`CREATE TABLE IF NOT EXISTS Coluna (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text,
            ordem INTEGER NOT NULL,
            boardId INTEGER,
            cor text,
            FOREIGN KEY (boardId) REFERENCES Board(id)
        )`);
    }
});


export default db