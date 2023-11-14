const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Usuario - Endpoints', () => {
    describe('POST /api/usuario', () => {
        it ('deve retornar usuário criado - 201', async() => {
            USUARIO_VALIDO = {'login':  'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1}
            const response = await chai.request('http://localhost:8000')
            .post('/usuario/add')
            .send(USUARIO_VALIDO);
            response.should.have.status(200);
        });
        it ('deve verificar usuário ja existente - 301', done => {
            USUARIO_VALIDO = {'login':  'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1}
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
    });
});