<template>
    <div align="center" id="content">
        <h3 class="secondaryColor">Editando Permissões</h3>
        <div align="center">
            <div class="card" style="width:75vw;">
                <div class="card-body" style="padding-top:35px; padding-bottom:30px;">
                    <ValidationForm :model="entrada" ref="validation" @save="salvar(entrada)">
                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-2">Depósito</label>
                            <div class="col-4" >
                                {{entrada.depositoName}}
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-2">Usuário</label>
                            <div class="col-4" >
                                {{entrada.usuarioName}}
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-2">Permissão</label>
                            <div class="col-4" >
                                <select v-model="entrada.permissaoId" class="form-control" v-on:change="carregarPermissao()">
                                    <option value=""></option> 
                                    <option v-for="permissao in permissoes" :key="permissao.idTipoPermissao" :value="permissao.idTipoPermissao">
                                        {{ permissao.descricao }}
                                    </option>
                                </select>
                                <span name="permissaoId" class="spanErro"></span>     
                            </div>
                        </div>

                        <div id="actionButtons" style="margin-top:50px">
                            <button v-if="entrada.id > 0" @click="excluir(entrada)" type="button" style="margin-right: 5px;" class="btn btn-secondary secondaryColorBtn">Excluir</button>
                            <button type="submit" class="btn btn-success primaryColorBtn">Salvar</button>
                            <ModalPergunta ref="modalPergunta"></ModalPergunta>
                        </div>
                    </ValidationForm>
                </div>
            </div>
        </div>
    </div>
    <ToastComponent ref="toast"></ToastComponent>
</template>

<script>
  import ModalPergunta from '../../components/ModalPergunta.vue'
  import ValidationForm from '../../components/ValidationForm.vue'
  import axios from 'axios'
  import ToastComponent from '@/components/ToastComponent.vue'

  export default {
        name: 'CadastroEdicaoEntradaView',
        components: { ModalPergunta, ValidationForm, ToastComponent },
        data() {
            return {
                entrada: {
                    id: this.$route.params.codigoEntrada,
                    depositoId: this.$route.params.codigoDeposito,
                    usuarioId: this.$route.params.codigoUsuario,
                    depositoName: null,
                    usuarioName: null,
                    permissaoId: null
                },
                unidadeMaterial: '?',
                depositos: null,
                permissoes: null
            }
        },
        methods: {
            salvar(entrada) {
                console.log(entrada)
                axios.post('deposito/depositoPermissao/editar', entrada).then(
                    this.$refs.toast.ativar('Permissão Edita Com Sucesso', 'sucesso'),
                    this.$router.back()
                ) 
            },
            carregarUsuario() {
                console.log(this.entrada.usuarioId) 
                axios.post('usuario/carregarNome', {id: this.entrada.usuarioId}).then( (result) => {
                        console.log('assda')
                        this.entrada.usuarioName = result.data.nome      
                   }
                )
            },
            carregarDeposito() { 
                axios.post('deposito/carregarRegistro', {id: this.entrada.depositoId}).then( (result) => {
                        this.entrada.depositoName = result.data.nome      
                   }
                )
            },
            carregarPermissao() {
                axios.post('deposito/depositoPermissao').then( (result) => {
                    this.permissoes = result.data           
                   }
                )              
            }
        },
        mounted(){
            this.carregarUsuario();
            this.carregarDeposito();
            this.carregarPermissao();
        }

        
    }
</script>

<style>

.cardColuna{
    padding: 0
}

</style>

