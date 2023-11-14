const axios = require('axios');

describe('Usuario - Endpoints', () => {
    describe('POST /api/usuario', () => {
      test('deve retornar usuário criado - 201', async () => {
        const USUARIO_VALIDO = { 'login': 'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1 };
      
        await axios.post('http://localhost:8000/usuario/add', USUARIO_VALIDO).then( 
          resp => {
          expect(resp.status).toBe(200);
          expect(resp.data.valido).toBe(false);
          }
        )
      });
      test('deve rasdsadetornar usuário criado - 201', async () => {
        const USUARIO_VALIDO = { 'login': 'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1 };
      
        await axios.post('http://localhost:8000/usuario/add', USUARIO_VALIDO).then( 
          resp => {
          expect(resp.status).toBe(200);
          expect(resp.data.valido).toBe(false);
          }
        )
      });
      test('deve retornar usuário criado - 201', async () => {
        const USUARIO_VALIDO = { 'login': 'teste', 'nome': 'batata', 'senha': 1, 'tipo': 1 };
      
        await axios.post('http://localhost:8000/usuario/add', USUARIO_VALIDO).then( 
          resp => {
          expect(resp.status).toBe(200);
          expect(resp.data.valido).toBe(false);
          }
        )
      });
    });
});