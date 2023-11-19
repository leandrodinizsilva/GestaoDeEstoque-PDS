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
}

describe('Usuario - Endpoints', () => {
    describe('POST /api/usuario', () => {
        it ('deve retornar usuário criado - 201', async() => {
            USUARIO_VALIDO = new Usuario('teste', 'batata', 1, 1)
            const response = await chai.request('http://localhost:8000')
            .post('/usuario/add')
            .send(USUARIO_VALIDO);
            response.should.have.status(200);
            response.body.should.have.property('valido').equal(true);
        });
        it ('deve verificar usuário ja existente - 301', done => {
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

        // it ('Deve retornar todos os 3 tipos de usuários', async() => {
        //     const response = await chai.request('http://localhost:8000')
        //     .post('/usuario/tipo')
        //     .send('');
        //     console.log(response.body)
        //     response.should.have.status(200);
        //     response.body.should.have.property('valido').equal(false);
        // });

        it ('Deve retornar nome do usuário', async() => {
            usuario = new Usuario('NomeLegal', 'LoginLegal', 1 , 3)
            await addUsuario(usuario)
            responseLoginUsuario = await logarNoSistema(usuario)
            jwtToken = responseLoginUsuario.body.token
            console.log(jwtToken)
            const response = await chai.request('http://localhost:8000')
            .post('/usuario/carregarNome')
            .set('authorization', jwtToken)
            .send({'id': 3});
            response.should.have.status(200);
            response.body.should.have.property('nome').equal('NomeLegal');
        });
    });
});