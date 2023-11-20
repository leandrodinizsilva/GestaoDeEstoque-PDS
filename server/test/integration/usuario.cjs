// import { response } from 'express';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

class Usuario{
    constructor(nome, login, senha, tipo) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.tipo = tipo;
    }
}

async function logarNoSistema(usuario) {
    const responseLoginUsuario = await chai.request('http://localhost:8000')
    .post('/usuario/validar')
    .send(usuario);

    return responseLoginUsuario;
}

async function addUsuario(usuario) {
    const response = await chai.request('http://localhost:8000')
    .post('/usuario/add')
    .send(usuario);

    return response;
}

describe('Usuario - Endpoints', () => {
    describe('POST /usuario', () => {
        it ('Deve retornar usuário criado', async() => {
            USUARIO_VALIDO = new Usuario('teste', 'batata', 1, 1)
            const response = await chai.request('http://localhost:8000')
            .post('/usuario/add')
            .send(USUARIO_VALIDO);
            response.should.have.status(200);
            response.body.should.have.property('valido').to.be.an('number');
        });
        it ('Deve verificar usuário ja existente', done => {
            USUARIO_VALIDO = new Usuario('teste', 'batata', 1, 1)
            chai.request('http://localhost:8000')
            .post('/usuario/add')
            .send(USUARIO_VALIDO)
            .end((err, res) => {
                chai.request('http://localhost:8000')
                .post('/usuario/add')
                .send(USUARIO_VALIDO)
                .end((err, res) => {
                    res.body.should.have.property('valido').equal(false);
                    done();
                });
            });
        });

        it ('Deve retornar usuario logado', async() => {
            USUARIO_VALIDO = new Usuario ('UsuarioLogado', 'UsuarioLogado', 1, 3)
            const responseAddUser = await chai.request('http://localhost:8000')
            .post('/usuario/add')
            .send(USUARIO_VALIDO);
            const responseLoginUsuario = await chai.request('http://localhost:8000')
            .post('/usuario/validar')
            .send(USUARIO_VALIDO);
            responseLoginUsuario.should.have.status(200);
            responseLoginUsuario.body.should.have.property('valido').equal(true);
        });

        it ('Deve retornar erro ao logar com usuario inexistente', async() => {
            USUARIO_VALIDO = new Usuario('UsuarioRuim', 'UsuarioRuim', 'errada', 3)
            const responseLoginUsuario = await chai.request('http://localhost:8000')
            .post('/usuario/validar')
            .send(USUARIO_VALIDO);
            responseLoginUsuario.should.have.status(200);
            responseLoginUsuario.body.should.have.property('valido').equal(false);
        });

        it ('Deve retornar nome do usuário', async() => {
            usuario = new Usuario('NomeLegal', 'LoginLegal', 1 , 3)

            responseUsuario = await addUsuario(usuario)
            idUsuario = responseUsuario.body['valido']


            responseLoginUsuario = await logarNoSistema(usuario)
            jwtToken = responseLoginUsuario.body.token

            const response = await chai.request('http://localhost:8000')
            .post('/usuario/carregarNome')
            .set('authorization', jwtToken)
            .send({'id': idUsuario});
            response.should.have.status(200);
            response.body.should.have.property('nome').equal('NomeLegal');
        });
    });
});