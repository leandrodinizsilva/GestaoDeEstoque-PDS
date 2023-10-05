<template>
    <div id="wallpaper">
        <div id="loginDiv">
            <ValidationForm id="loginForm" :model="usuario" ref="validation" @save="salvar(usuario)">
                <img src="../../assets/stocklogo.png" alt="logo" style="width:125px; margin-bottom:15px">
                <div class="container" id="loginContainer">
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

                    <div>
                        <a @click="irParaCadastroUsuario()" style="font-size: small; float:right; color:#34495E; cursor: pointer;">Criar Conta</a>
                    </div>
                                         
                    <button type="submit" id="loginButton" class="btn btn-secondary insere primaryColorBtn" >Login</button>                  

                </div>
            </ValidationForm>
        </div>
    </div>
    <Toast ref="toast"></Toast>
</template>

<script>
import ValidationForm from '@/components/ValidationForm.vue';
import axios from 'axios';
import Toast from '@/components/ToastComponent.vue';

  export default {
        name: 'LoginView',
        components: {ValidationForm, Toast },
        data() {
            return {
                usuario:{
                    login: null,
                    senha: null
                }
            }
        },
        methods: {
            salvar(usuario){
                axios.post('usuario/validar', { "login" : usuario.login, "senha": usuario.senha}).then( (res) =>{ 
                    if(res.data.valido){
                        this.$refs.toast.ativar('Bem vindo', 'sucesso')
                        this.$store.commit('login', {"usuario": {nome: res.data.usuario.nome}, "token": res.data.token })
                        this.$router.push('/home')
                    }                    
                    else
                        this.$refs.validation.insereErrorMessage('senha', 'Usuário ou senha inválidos')
                } )
            },
            irParaCadastroUsuario(){
                this.$router.push('/cadastrousuario')
            }
        },
        mounted(){
            this.$refs.validation.required('login',"Login")
            this.$refs.validation.required('senha',"Senha")
        }

        
    }
</script>

<style>
body, html {
  min-height:100%;
  height:100%;  /* if not working try vh instead of % */
}

.divInput{
    margin-bottom:10px;
}
.loginLabel{
    position: absolute;
}
#wallpaper{
    width: 100% !important;
    background:url(../../assets/wallpaper.jpg);
    height: 100%; 

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; 
}

#loginDiv{
    display:flex;
    justify-content: center;
    position: absolute;
    width: 300px;
    height: 200px;
    z-index: 15;
    top: 30%;
    left: 50%;
    margin: -100px 0 0 -150px;
}

input[type=text], input[type=password] {
  padding: 12px 20px;

  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

#loginButton {
    
  margin-bottom:30px !important;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

#loginForm{
    padding-bottom: 50px !important;
    padding-left: 50px !important;
    padding-right: 50px !important;
    padding-top:35px !important;
    height: 420px;
    width: 500px;
    border: 3px solid white;
    background-color: white;
    border-radius: 5px; 
    padding: 20px;
    padding-bottom: 10px !important;
}

#loginContainer {
  width:300px;
}

.loginInput{
    margin-top:25px !important;
}




</style>

