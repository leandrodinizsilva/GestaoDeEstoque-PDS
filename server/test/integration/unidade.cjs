const chai = require('chai');
const chaiHttp = require('chai-http');

class Unidade{
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


describe('Unidade', () => {
    before(async function () {
        USUARIO_VALIDO = {'login':  'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1}
        await chai.request('http://localhost:8000').post('/usuario/add').send(USUARIO_VALIDO)
        var login = {"login": 'teste', "senha": 1}
        var response = await chai.request('http://localhost:8000').post('/usuario/validar').send(login)
        usuarioId = response.body.usuario.id
        jwtToken = response.body.token;
    });

    describe('POST /unidade', () => {
        it ('Deve adicionar unidade', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            responseUnidadeAdd.should.have.status(200)
        });
        it ('Deve editar unidade', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            let unidade2 = new Unidade(null, 'Metros', usuarioId)
            var responseUnidade2 = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade2).set('authorization', jwtToken)
            var responseUnidadeUpdate = await chai.request('http://localhost:8000').post('/material/update').send(unidade2).set('authorization', jwtToken)
            responseUnidadeAdd.should.have.status(200);
            responseUnidade2.should.have.status(200);
            responseUnidadeUpdate.should.have.status(200);
        });
        it ('Deve deletar uma unidade', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            var responseUnidadeDelete = await chai.request('http://localhost:8000').post('/unidade/delete').send(unidade).set('authorization', jwtToken)
            responseUnidadeAdd.should.have.status(200);
            responseUnidadeDelete.should.have.status(200);
        });
    });
});