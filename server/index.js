import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import UsuarioController from './controllers/usuarioController.js';
import DepositoController from './controllers/depositoController.js';
import jwt from'jsonwebtoken'

const usuarioController = new UsuarioController
const depositoController = new DepositoController

const app = express()

app.use(cors());
app.use(bodyParser.json());

var HTTP_PORT = 8000 

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

let usuarioId = 0

function validaJWT(req, res, next){
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ valido: false, mensagem: 'Sua sessão expirou.' });
    
    jwt.verify(token, 'f9bf78b9a18ce6d46a0cd2b0b86df9da', function(err, decoded) {
      if(decoded)
        usuarioId = decoded.id
      if (err) return res.status(401).json({ valido: false, mensagem: 'Sua sessão expirou.' });

      next();
    });
}

app.post('/usuario/add', usuarioController.add)
app.post('/usuario/validar', usuarioController.login);
app.get("/usuario", validaJWT, usuarioController.index);

app.post("/deposito", validaJWT, depositoController.index);
app.post("/deposito/add", validaJWT, depositoController.add);
app.post("/deposito/update", validaJWT, depositoController.update);
app.post("/deposito/delete", validaJWT, depositoController.delete);
app.post("/deposito/carregarRegistro", validaJWT, depositoController.carregarRegistro);

app.use(function(req, res){
    res.status(404);
});

export default {
    usuarioId: function () {
        return usuarioId
    }
};



