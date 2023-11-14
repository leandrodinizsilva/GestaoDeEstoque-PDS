const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Usuario - Endpoints', () => {
    describe('POST /api/usuario', () => {
        it ('deve retornar usuário criado - 201', done => {
            USUARIO_VALIDO = {'login':  'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1}
            chai.request('http://localhost:8000')
            .post('/usuario/add')
            .send(USUARIO_VALIDO)
            .end((err, res) => {
                chai.assert.isNull(err);
                chai.assert.isNotEmpty(res.body);
                res.should.have.status(200);
                res.body.should.have.property('valido').equal(false);
                done();
            });
        });
    });
});