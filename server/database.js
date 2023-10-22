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

        db.run(`CREATE TABLE IF NOT EXISTS TipoUsuario (
            idTipoUsuario INTEGER PRIMARY KEY,
            descricao VARCHAR(30)
        )`, (createTableErr) => {
            if (!createTableErr) {
                db.run(`DELETE FROM TipoUsuario;`);
                db.run(`delete from sqlite_sequence where name='TipoUsuario'`);
                db.run(`INSERT INTO TipoUsuario (idTipoUsuario, descricao)
                VALUES (1,'Usuário'), (2,'Gerente'), (3,'Administrador')`);
            }
        });



        db.run(`CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login text UNIQUE,
            senha text,
            tipoUsuario INT DEFAULT NULL,
            nome text,
            FOREIGN KEY(tipoUsuario) REFERENCES TipoUsuario(idTipoUsuario)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS TipoPermissaoDeposito (
            idTipoPermissao INTEGER PRIMARY KEY,
            descricao VARCHAR(30)
        )`, (createTableErr) => {
            if (!createTableErr) {
                db.run(`DELETE FROM TipoPermissaoDeposito;`);
                db.run(`delete from sqlite_sequence where name='TipoPermissaoDeposito'`);
                db.run(`INSERT INTO TipoPermissaoDeposito (idTipoPermissao,descricao)
                VALUES (1,'Inválida'), (2,'Visualizar'), (3,'Editar')`);
            }
        });



        db.run(`CREATE TABLE IF NOT EXISTS PermissaoUsuarioDeposito (
            usuarioId INT,
            depositoId INT,
            tipoPermissao INT DEFAULT NULL,
            FOREIGN KEY (tipoPermissao) REFERENCES TipoPermissaoDeposito(idTipoPermissao),
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id),
            FOREIGN KEY (depositoId) REFERENCES Deposito(id),
            PRIMARY KEY(usuarioId, depositoId)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS PermissaoUsuarioDepositoLog (
            idLog INTEGER PRIMARY KEY AUTOINCREMENT,
            usuarioId INT,
            depositoId INT,
            tipoPermissao INT DEFAULT NULL,
            dataAlterado DATETIME DEFAULT CURRENT_TIMESTAMP,
            usuarioAlterouId INT,
            FOREIGN KEY (tipoPermissao) REFERENCES TipoPermissaoDeposito(idTipoPermissao),
            FOREIGN KEY (usuarioId) REFERENCES Usuario(id),
            FOREIGN KEY (usuarioAlterouId) REFERENCES Usuario(id),
            FOREIGN KEY (depositoId) REFERENCES Deposito(id)
        )`)

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

// //Dados Base



export default db