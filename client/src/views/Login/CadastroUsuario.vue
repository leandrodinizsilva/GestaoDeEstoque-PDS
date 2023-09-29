<template>
    <div id="wallpaper">
        <div id="loginDiv">
            <ValidationForm id="cadastroForm" :model="usuario" ref="validation" @save="salvar(usuario)">
                <div style="display:flex">
                    <font-awesome-icon @click="irParaLogin()" style="font-size:xx-large; margin-right: 15px; cursor:pointer" icon="fa-solid fa-arrow-left" />
                    <h3 id="cadastroUsuarioTitle">Cadastro</h3>
                </div>
                <div class="container" id="loginContainer">                    
                    <div class="divInput">
                        <label class="loginLabel">Nome</label>
                        <input type="text" class="form-control loginInput" v-model="usuario.nome" placeholder="Insira seu nome">
                        <span name="nome" class="spanErro"></span>  
                    </div>

                    <div class="divInput">
                        <label class="loginLabel">Login</label>
                        <input type="text" class="form-control loginInput" v-model="usuario.login" placeholder="Insira seu login">
                        <span name="login" class="spanErro"></span>  
                    </div>

                    <div class="divInput">
                        <label class="loginLabel">Senha</label>
                        <input type="password" class="form-control loginInput" v-model="usuario.senha"  placeholder="Insira sua senha">
                        <span name="senha" class="spanErro"></span>
                    </div>
                                         
                    <button type="submit" id="loginButton" class="btn btn-secondary insere primaryColorBtn" >Salvar</button>                  

                </div>
            </ValidationForm>
        </div>
    </div>
    
</template>

<script>
import ValidationForm from '@/components/ValidationForm.vue';
import axios from 'axios';

  export default {
        name: 'LoginView',
        components: {ValidationForm },
        data() {
            return {
                usuario:{
                    login: null,
                    senha: null,
                    nome: null
                }
            }
        },
        methods: {
           salvar(usuario){
            axios.post('http://localhost:8000/usuario/add', usuario).then( (res) =>{ 
                    if(!res.data.valido)
                        this.$refs.validation.insereErro("login", "Login já está sendo utilizado.")
                    else
                        this.$router.push('/')
                } )
           },
           irParaLogin(){
                this.$router.push('/')
           }
        },  
        mounted(){
            this.$refs.validation.required('login',"Login")
            this.$refs.validation.required('nome',"Nome")
            this.$refs.validation.required('senha',"Senha")
        }      
    }
</script>

<style>

#cadastroUsuarioTitle{
    margin-bottom: 20px;
}

#cadastroForm{
    padding-bottom: 50px !important;
    padding-left: 50px !important;
    padding-right: 50px !important;
    padding-top:20px !important;
    width: 700px;
    height: fit-content;
    border: 3px solid #f1f1f1;
    background-color: white;
    border-radius: 5px;
}

</style>

