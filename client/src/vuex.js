import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state () {
      return {
        usuario: { "nome": "" },
        tokenJWT: null,
        paginaAtual: 1
      }
    },
    mutations: {
      login(state, obj) {
        console.log(obj)
        if(obj) {
            state.usuario = obj.usuario
            state.tokenJWT = obj.token
            state.paginaAtual = 1
        }
      },
      logout(state) {
        state.usuario = { "nome": "" }
        state.tokenJWT = null
      },
      setPagina(state, pagina) {
        if(pagina > 0)
          state.paginaAtual = pagina
      },
    },
    getters:{
        getUsuarioNome(state){
            return state.usuario.nome
        },
    },
    plugins: [createPersistedState()],  
  })
  

export default store;