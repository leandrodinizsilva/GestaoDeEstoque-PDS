const chai = require('chai');
const chaiHttp = require('chai-http');

class Material{
    constructor(id, nome, unidadeId, preco) {
        this.id = id
        this.nome = nome
        this.unidadeId = unidadeId
        this.preco = preco
    }
}

class Unidade{
    constructor(id, nome, usuarioId) {
        this.id = id
        this.nome = nome
        this.usuarioId = usuarioId
    }
}

const assert = chai.assert
const expect = chai.expect

let jwtToken
let usuarioId


chai.use(chaiHttp);
chai.should();


describe('Material', () => {
    before(async function () {
        USUARIO_VALIDO = {'login':  'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1}
        await chai.request('http://localhost:8000').post('/usuario/add').send(USUARIO_VALIDO)
        var login = {"login": 'teste', "senha": 1}
        var response = await chai.request('http://localhost:8000').post('/usuario/validar').send(login)
        usuarioId = response.body.usuario.id
        jwtToken = response.body.token;
    });

    describe('POST /material', () => {
        it ('Deve adicionar material', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            var unidadeId = responseUnidadeAdd.body.id
            let material = new Material(null, 'material', unidadeId, 200)
            var responseMaterialAdd = await chai.request('http://localhost:8000').post('/material/add').send(material).set('authorization', jwtToken)
            var materialId = responseMaterialAdd.body.id
            var responseMaterialLoad = await chai.request('http://localhost:8000').post('/material/carregarRegistro').send({"id": materialId}).set('authorization', jwtToken)
            responseUnidadeAdd.should.have.status(200);
            responseMaterialAdd.should.have.status(200);
            responseMaterialLoad.should.have.status(200);
            responseMaterialLoad.body.should.have.property('nome').equal('material');
        });
        it ('Deve editar material', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            var unidadeId = responseUnidadeAdd.body.id
            let materialAdd = new Material(null, 'material', unidadeId, 200)
            var responseMaterialAdd = await chai.request('http://localhost:8000').post('/material/add').send(materialAdd).set('authorization', jwtToken)
            let materialId = responseMaterialAdd.body.id
            let materialUpdate = new Material(materialId, 'material2', unidadeId, 300)
            await chai.request('http://localhost:8000').post('/material/update').send(materialUpdate).set('authorization', jwtToken)
            var responseMaterialLoad = await chai.request('http://localhost:8000').post('/material/carregarRegistro').send({"id": materialId}).set('authorization', jwtToken)
            responseUnidadeAdd.should.have.status(200);
            responseMaterialAdd.should.have.status(200);
            responseMaterialLoad.should.have.status(200);
            responseMaterialLoad.body.should.have.property('nome').equal('material2');
            responseMaterialLoad.body.should.have.property('preco').equal(300);   
        });
        it ('Deve deletar material', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            var unidadeId = responseUnidadeAdd.body.id
            let material = new Material(null, 'material', unidadeId, 200)
            var responseMaterialAdd = await chai.request('http://localhost:8000').post('/material/add').send(material).set('authorization', jwtToken)
            var materialId = responseMaterialAdd.body.id
            var responseMaterialDelete = await chai.request('http://localhost:8000').post('/material/delete').send({"id": materialId}).set('authorization', jwtToken)
            var responseMaterialLoad = await chai.request('http://localhost:8000').post('/material/carregarRegistro').send({"id": materialId}).set('authorization', jwtToken)
            responseUnidadeAdd.should.have.status(200)
            responseMaterialAdd.should.have.status(200)
            responseMaterialDelete.should.have.status(200)
            responseMaterialLoad.should.have.status(200)
            expect(responseMaterialLoad.body).to.be.empty
        });
    });
});