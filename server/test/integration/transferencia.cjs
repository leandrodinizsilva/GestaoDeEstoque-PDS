const chai = require('chai');
const chaiHttp = require('chai-http');


class Usuario{
    constructor(nome, login, senha, tipo) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.tipo = tipo;
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

class Transferencia{
    constructor(id, materialId, depositoOrigemId, depositoDestinoId, data, quantidade, usuarioId) {
        this.id = id
        this.materialId = materialId
        this.depositoOrigemId = depositoOrigemId
        this.depositoDestinoId = depositoDestinoId
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

async function addDeposito(deposito, jwtToken) {
    var responseDepositoAdd = await chai.request('http://localhost:8000').post('/deposito/add').send(deposito).set('authorization', jwtToken)
    var depositoId = responseDepositoAdd.body.id


    return depositoId;
}

async function addUnidade(unidade, jwtToken) {
    var responseUnidadeAdd = await chai.request('http://localhost:8000').post('/unidade/add').send(unidade).set('authorization', jwtToken)
    var unidadeId = responseUnidadeAdd.body.id


    return unidadeId;
}

async function addMaterial(material, jwtToken) {
    var responseMaterialAdd = await chai.request('http://localhost:8000').post('/material/add').send(material).set('authorization', jwtToken)
    var materialId = responseMaterialAdd.body.id

    return materialId
}

async function addEntrada(entrada, jwtToken) {
    var responseEntradaAdd = await chai.request('http://localhost:8000').post('/entrada/add').send(entrada).set('authorization', jwtToken)
    var entradaId = responseEntradaAdd.body.id

    return entradaId
}


describe('Transferencias', () => {
    before(async function () {
        USUARIO_VALIDO = new Usuario('testeTranferencia', 'testeTranferencia', 1, 1)
        await chai.request('http://localhost:8000').post('/usuario/add').send(USUARIO_VALIDO)
        var login = {"login": 'testeTranferencia', "senha": 1}
        var response = await chai.request('http://localhost:8000').post('/usuario/validar').send(login)
        usuarioId = response.body.usuario.id
        jwtToken = response.body.token;
    });

    describe('POST /transferencia', () => {
        it ('Deve adicionar transferencia', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var unidadeId = await addUnidade(unidade, jwtToken)

            let material = new Material(null, 'material', unidadeId, 200)
            var materialId = await addMaterial(material, jwtToken)

            let depositoOrigem = new Deposito(null, 'depositoOrigem', usuarioId)
            var depositoOrigemId = await addDeposito(depositoOrigem, jwtToken);

            let depositoDestino = new Deposito(null, 'depositoDestino', usuarioId)
            var depositoDestinoId = await addDeposito(depositoDestino, jwtToken);

            var entrada = new Entrada(null, materialId, depositoOrigemId, 300, new Date(), usuarioId)
            var entradaId = await addEntrada(entrada, jwtToken)


            var transferencia = new Transferencia(null, materialId, depositoOrigemId, depositoDestinoId, new Date(), 20, usuarioId)
            var responseTransferenciaAdd = await chai.request('http://localhost:8000').post('/transferencia/add').send(transferencia).set('authorization', jwtToken)
            var transferenciaId = responseTransferenciaAdd.body.id
            var responseTransferenciaLoad = await chai.request('http://localhost:8000').post('/transferencia/carregarRegistro').send({"id": transferenciaId}).set('authorization', jwtToken)

            responseTransferenciaAdd.should.have.status(200);
            responseTransferenciaLoad.should.have.status(200);
            responseTransferenciaLoad.body.should.have.property('materialId').equal(materialId);
            responseTransferenciaLoad.body.should.have.property('depositoOrigemId').equal(depositoOrigemId);
            responseTransferenciaLoad.body.should.have.property('depositoDestinoId').equal(depositoDestinoId);
            responseTransferenciaLoad.body.should.have.property('usuarioId').equal(usuarioId);
            responseTransferenciaLoad.body.should.have.property('quantidade').equal(20);
        });

        it ('Deve editar uma transferencia', async() => {
            let unidade = new Unidade(null, 'Kg', usuarioId)
            var unidadeId = await addUnidade(unidade, jwtToken)

            let material = new Material(null, 'material', unidadeId, 200)
            var materialId = await addMaterial(material, jwtToken)

            let depositoOrigem = new Deposito(null, 'depositoOrigem', usuarioId)
            var depositoOrigemId = await addDeposito(depositoOrigem, jwtToken);

            let depositoDestino = new Deposito(null, 'depositoDestino', usuarioId)
            var depositoDestinoId = await addDeposito(depositoDestino, jwtToken);

            var entrada = new Entrada(null, materialId, depositoOrigemId, 300, new Date(), usuarioId)
            var entradaId = await addEntrada(entrada, jwtToken)


            var transferencia = new Transferencia(null, materialId, depositoOrigemId, depositoDestinoId, new Date(), 20, usuarioId)
            var responseTransferenciaAdd = await chai.request('http://localhost:8000').post('/transferencia/add').send(transferencia).set('authorization', jwtToken)
            var transferenciaId = responseTransferenciaAdd.body.id

            var transferenciaUpdate = new Transferencia(transferenciaId, materialId, depositoOrigemId, depositoDestinoId, new Date(), 40, usuarioId)
            var responseTransferenciaUpdate = await chai.request('http://localhost:8000').post('/transferencia/update').send(transferenciaUpdate).set('authorization', jwtToken)

            var responseTransferenciaLoad = await chai.request('http://localhost:8000').post('/transferencia/carregarRegistro').send({"id": transferenciaId}).set('authorization', jwtToken)

            responseTransferenciaAdd.should.have.status(200);
            responseTransferenciaLoad.should.have.status(200);
            responseTransferenciaUpdate.should.have.status(200);
            responseTransferenciaLoad.body.should.have.property('materialId').equal(materialId);
            responseTransferenciaLoad.body.should.have.property('depositoOrigemId').equal(depositoOrigemId);
            responseTransferenciaLoad.body.should.have.property('depositoDestinoId').equal(depositoDestinoId);
            responseTransferenciaLoad.body.should.have.property('usuarioId').equal(usuarioId);
            responseTransferenciaLoad.body.should.have.property('quantidade').equal(40);
        });
    });
});