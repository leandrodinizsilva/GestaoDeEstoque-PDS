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
const expect = chai.expect;
let jwtToken;
let usuarioId;


chai.use(chaiHttp);
chai.should();


describe('Deposito', () => {
    before(async function () {
        USUARIO_VALIDO = {'login':  'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1}
        await chai.request('http://localhost:8000').post('/usuario/add').send(USUARIO_VALIDO)
        var login = {"login": 'teste', "senha": 1}
        var response = await chai.request('http://localhost:8000').post('/usuario/validar').send(login)
        usuarioId = response.body.usuario.id
        jwtToken = response.body.token;
    });

    describe('POST /deposito', () => {
        it ('Deve adicionar depósito', async() => {
            let deposito = new Deposito(null, 'teste', usuarioId)
            var response = await chai.request('http://localhost:8000').post('/deposito/add').send(deposito).set('authorization', jwtToken)
            var depositoId = response.body.id
            var responseLoad = await chai.request('http://localhost:8000').post('/deposito/carregarRegistro').send({"id": depositoId}).set('authorization', jwtToken)
            response.should.have.status(200);
            responseLoad.should.have.status(200);
            responseLoad.body.should.have.property('nome').equal('teste');

        });
        it ('Deve editar depósito', async() => {
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
        it ('Deve deletar depósito', async() => {
            let deposito = new Deposito(null, 'teste', usuarioId)
            var response = await chai.request('http://localhost:8000').post('/deposito/add').send(deposito).set('authorization', jwtToken)
            var depositoId = response.body.id
            var responseDelete = await chai.request('http://localhost:8000').post('/deposito/delete').send({"id": depositoId}).set('authorization', jwtToken)
            var responseLoad = await chai.request('http://localhost:8000').post('/deposito/carregarRegistro').send({"id": depositoId}).set('authorization', jwtToken)
            response.should.have.status(200)
            responseLoad.should.have.status(200)
            responseDelete.should.have.status(200)
            expect(responseLoad.body).to.be.empty
        });
    });


});