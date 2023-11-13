const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Usuario - Endpoints', () => {
    describe('POST /api/usuario', () => {
        it ('deve retornar usuário criado - 201', done => {
            USUARIO_VALIDO = {'login':  'teste2', 'nome': 'batata', 'senha': 1, 'tipo': 1}
            chai.request('http://localhost:8000')
            .post('/usuario/add')
            .send(USUARIO_VALIDO)
            .end((err, res) => {
                chai.assert.isNull(err);
                chai.assert.isNotEmpty(res.body);
                res.should.have.status(200);

                console.log(res.body)
                res.body.should.have.property('error').equal(0);
                res.body.payload.comments.should.have.property('_id');
                res.body.payload.comments.should.have.property('nome').equal(USUARIO_VALIDO.nome);
                done();
            });
        });
        it ('deve retornar usuário existente - 303', done => {
            //TODO
            done();
        });
        it ('deve retornar campos obrigatórios não informados ou inválidos - 500', done => {
            //TODO
            done();
        });
    });
});