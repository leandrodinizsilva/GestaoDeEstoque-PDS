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

class Saida{
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
const expect = chai.expect;

let jwtToken;
let usuarioId;

chai.use(chaiHttp);
chai.should();


describe('Saida', () => {
    before(async function () {
        USUARIO_VALIDO = {'login':  'testeSaida', 'nome': 'testeSaida', 'senha': 1, 'tipo': 1}
        await chai.request('http://localhost:8000').post('/usuario/add').send(USUARIO_VALIDO)
        var login = {"login": 'testeSaida', "senha": 1}
        var response = await chai.request('http://localhost:8000').post('/usuario/validar').send(login)
        usuarioId = response.body.usuario.id
        jwtToken = response.body.token;
    });

    describe('POST /saida', () => {
        it ('Deve adicionar uma nova saida', async() => {
            let unidade = new Unidade(null, 'Ton', usuarioId)
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

            var saida = new Saida(null, materialId, depositoId, 20, new Date(), usuarioId)
            var responseSaidaAdd = await chai.request('http://localhost:8000').post('/saida/add').send(saida).set('authorization', jwtToken)
            var saidaId = responseSaidaAdd.body.id

            var responseSaidaLoad = await chai.request('http://localhost:8000').post('/saida/carregarRegistro').send({"id": saidaId}).set('authorization', jwtToken)

            responseUnidadeAdd.should.have.status(200);
            responseMaterialAdd.should.have.status(200);
            responseDepositoAdd.should.have.status(200);
            responseEntradaAdd.should.have.status(200);
            responseSaidaLoad.should.have.status(200);
            responseSaidaLoad.body.should.have.property('quantidade').equal(20);
            responseSaidaLoad.body.should.have.property('materialId').equal(materialId);
            responseSaidaLoad.body.should.have.property('depositoId').equal(depositoId);
            responseSaidaLoad.body.should.have.property('usuarioId').equal(usuarioId);
        
        });
        it ('Deve editar saida', async() => {
            let unidade = new Unidade(null, 'Ton', usuarioId)
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

            var saida = new Saida(null, materialId, depositoId, 20, new Date(), usuarioId)
            var responseSaidaAdd = await chai.request('http://localhost:8000').post('/saida/add').send(saida).set('authorization', jwtToken)
            var saidaId = responseSaidaAdd.body.id

            var saidaUpdate = new Saida(saidaId, materialId, depositoId, 35, new Date(), usuarioId)
            var responseSaidaUpdate = await chai.request('http://localhost:8000').post('/saida/update').send(saidaUpdate).set('authorization', jwtToken)
            var responseSaidaLoad = await chai.request('http://localhost:8000').post('/saida/carregarRegistro').send({"id": saidaId}).set('authorization', jwtToken)

            

            responseUnidadeAdd.should.have.status(200);
            responseMaterialAdd.should.have.status(200);
            responseDepositoAdd.should.have.status(200);
            responseEntradaAdd.should.have.status(200);
            responseSaidaUpdate.should.have.status(200);
            responseSaidaLoad.body.should.have.property('quantidade').equal(35);
        });
        it ('Deve deletar entrada', async() => {
            let unidade = new Unidade(null, 'Ton', usuarioId)
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

            var saida = new Saida(null, materialId, depositoId, 20, new Date(), usuarioId)
            var responseSaidaAdd = await chai.request('http://localhost:8000').post('/saida/add').send(saida).set('authorization', jwtToken)
            var saidaId = responseSaidaAdd.body.id

            var responseSaidaDelete = await chai.request('http://localhost:8000').post('/saida/delete').send({"id": saidaId}).set('authorization', jwtToken)
            var responseSaidaLoad = await chai.request('http://localhost:8000').post('/saida/carregarRegistro').send({"id": entradaId}).set('authorization', jwtToken)

            responseSaidaDelete.should.have.status(200)
            responseSaidaLoad.should.have.status(200)
            expect(responseSaidaLoad.body).to.be.empty
        });
    });
});