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

class Deposito{
    constructor(id, nome, usuarioId) {
        this.id = id
        this.nome = nome
        this.usuarioId = usuarioId
    }
}

class Entrada{
    constructor(id, materialId, depositoId, quantidade, data, usuarioId) {
        this.id = id
        this.materialId = materialId
        this.depositoId = depositoId
        this.quantidade = quantidade
        this.data = data
        this.usuarioId = usuarioId
    }
}

const assert = chai.assert;
let jwtToken;
let usuarioId;

chai.use(chaiHttp);
chai.should();


describe('Entrada', () => {
    before(async function () {
        USUARIO_VALIDO = {'login':  'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1}
        await chai.request('http://localhost:8000').post('/usuario/add').send(USUARIO_VALIDO)
        var login = {"login": 'teste', "senha": 1}
        var response = await chai.request('http://localhost:8000').post('/usuario/validar').send(login)
        usuarioId = response.body.usuario.id
        jwtToken = response.body.token;
    });

    describe('POST /entrada', () => {
        it ('Deve adicionar entrada', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            var unidadeId = responseUnidadeAdd.body.id
            let material = new Material(null, 'material', unidadeId, 200)
            var responseMaterialAdd = await chai.request('http://localhost:8000').post('/material/add').send(material).set('authorization', jwtToken)
            var materialId = responseMaterialAdd.body.id
            let deposito = new Deposito(null, 'deposito', usuarioId)
            var responseDepositoAdd = await chai.request('http://localhost:8000').post('/deposito/add').send(deposito).set('authorization', jwtToken)
            var depositoId = responseDepositoAdd.body.id
            var entrada = new Entrada(null, materialId, depositoId, 200, new Date(), usuarioId)
            var responseEntradaAdd = await chai.request('http://localhost:8000').post('/entrada/add').send(entrada).set('authorization', jwtToken)
            var entradaId = responseEntradaAdd.body.id
            var responseEntradaLoad = await chai.request('http://localhost:8000').post('/entrada/carregarRegistro').send({"id": entradaId}).set('authorization', jwtToken)

            responseUnidadeAdd.should.have.status(200);
            responseMaterialAdd.should.have.status(200);
            responseDepositoAdd.should.have.status(200);
            responseEntradaAdd.should.have.status(200);
            responseEntradaLoad.should.have.status(200);
            responseEntradaLoad.body.should.have.property('quantidade').equal(200);
            responseEntradaLoad.body.should.have.property('materialId').equal(materialId);
            responseEntradaLoad.body.should.have.property('depositoId').equal(depositoId);
            responseEntradaLoad.body.should.have.property('usuarioId').equal(usuarioId);
        
        });
        it ('Deve editar entrada', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
            var unidadeId = responseUnidadeAdd.body.id
            let material = new Material(null, 'material', unidadeId, 200)
            var responseMaterialAdd = await chai.request('http://localhost:8000').post('/material/add').send(material).set('authorization', jwtToken)
            var materialId = responseMaterialAdd.body.id
            let deposito = new Deposito(null, 'deposito', usuarioId)
            var responseDepositoAdd = await chai.request('http://localhost:8000').post('/deposito/add').send(deposito).set('authorization', jwtToken)
            var depositoId = responseDepositoAdd.body.id
            var entradaAdd = new Entrada(null, materialId, depositoId, 200, new Date(), usuarioId)
            var responseEntradaAdd = await chai.request('http://localhost:8000').post('/entrada/add').send(entradaAdd).set('authorization', jwtToken)
            var entradaId = responseEntradaAdd.body.id
            var entradaUpdate = new Entrada(entradaId, materialId, depositoId, 300, new Date(), usuarioId)
            var responseEntradaUpdate = await chai.request('http://localhost:8000').post('/entrada/update').send(entradaUpdate).set('authorization', jwtToken)
            var responseEntradaLoad = await chai.request('http://localhost:8000').post('/entrada/carregarRegistro').send({"id": entradaId}).set('authorization', jwtToken)

            

            responseUnidadeAdd.should.have.status(200);
            responseMaterialAdd.should.have.status(200);
            responseDepositoAdd.should.have.status(200);
            responseEntradaAdd.should.have.status(200);
            responseEntradaUpdate.should.have.status(200)
            responseEntradaLoad.should.have.status(200);
            responseEntradaLoad.body.should.have.property('quantidade').equal(300);
        });
    });
});