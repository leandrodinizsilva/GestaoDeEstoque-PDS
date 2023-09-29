import sqlite3  from 'sqlite3';
import md5 from 'md5';

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
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
    }
});


export default db