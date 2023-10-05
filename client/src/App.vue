<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="!eLogin">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/Home" class="nav-link">Home</router-link>
                </li>
            </ul>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/Deposito" class="nav-link">Depósito</router-link>
                </li>
            </ul>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/Unidade" class="nav-link">Unidade</router-link>
                </li>
            </ul>
        </div>
        <a style="color:gray;">Bem vindo</a>
        <a style="color:gray; font-weight: 600;">{{getNomeUsuarioLogado}}</a>
        <a id="logout" @click="logout()">(Sair)</a>
    </nav>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  computed: {
    eLogin() {
      return this.$route.path ==  '/' ||  this.$route.path ==  '/cadastrousuario' ? true : false 
    },
    getNomeUsuarioLogado () {
      return this.$store.state.usuario.nome
    }
  },
  methods: {
    logout(){
      this.$store.commit('logout')
      this.$router.push({ name: 'Login' })
    }
  },
  mounted(){
  }


}
</script>

<style>
#logout{
  color:#234E70;
  margin-right: 30px;
  cursor: pointer;
}

#logout:hover{
  color:#79b6c9;
}
.spanErro{
  color: red !important;
}
.navbar{
  display:flex !important;
  justify-content: flex-start !important;
  height: 60px !important;
  margin-bottom: 20px;
}

a{
  margin-left: 20px !important;
}

.primaryColorBtn{
  background-color:#234E70 !important;
  border-color: #234E70 !important
}

.secondaryColorBtn{
  background-color:#234E70 !important;
  border-color: #234E70 !important
}

.secondaryColor{
  color: #234E70 !important;
}

.spanErro{
  float: left;
}

body{
  font-family: 'Roboto Mono', monospace !important;
}

.nav-link:hover{
  color:#234E70 !important;
}
</style>
