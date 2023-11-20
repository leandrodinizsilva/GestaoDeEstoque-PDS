const chai = require('chai');
const chaiHttp = require('chai-http');

class Deposito{
    constructor(id, nome, usuarioId) {
        this.id = id
        this.nome = nome
        this.usuarioId = usuarioId
    }
}

const assert = chai.assert;
let jwtToken;
let usuarioId;


chai.use(chaiHttp);
chai.should();


describe('Deposito - Endpoints', () => {
    before(function (done) {
        var login = {"login": 'teste', "senha": 1}
        chai.request('http://localhost:8000').post('/usuario/validar').send(login).end(function (err, res) {
            if (err) {
                done(err);
            } else {
                usuarioId = res.body.usuario.id
                jwtToken = res.body.token;

                done();
            }
        });
    });

    describe('POST /deposito', () => {
        it ('insere deposito - 201', async() => {
            let deposito = new Deposito(null, 'teste', usuarioId)
            var response = await chai.request('http://localhost:8000').post('/deposito/add').send(deposito).set('authorization', jwtToken)
            response.should.have.status(200);

        });
    });

    describe('POST /deposito', () => {
        it ('adiciona, edita e carrega deposito - 201', async() => {
            let deposito = new Deposito(null, 'teste', usuarioId)
            var response = await chai.request('http://localhost:8000').post('/deposito/add').send(deposito).set('authorization', jwtToken)
            var idDeposito = response.body.id
            let deposito2 = new Deposito(idDeposito, 'teste2', usuarioId)
            var responseUpdate = await chai.request('http://localhost:8000').post('/deposito/update').send(deposito2).set('authorization', jwtToken)
            var responseLoad = await chai.request('http://localhost:8000').post('/deposito/carregarRegistro').send({"id": idDeposito}).set('authorization', jwtToken)
            response.should.have.status(200);
            responseUpdate.should.have.status(200);
            responseLoad.should.have.status(200);
            responseLoad.body.should.have.property('nome').equal('teste2');
        });
    });
});