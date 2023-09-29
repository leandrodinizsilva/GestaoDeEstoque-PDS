<template>
    <div align="center" id="content">
        <h3 class="primaryColor" >Cadastro Depósito</h3>
        <div align="center">
            <div class="card" style="width:75vw;">
                <div class="card-body" style="padding-top:35px; padding-bottom:30px;">
                    <ValidationForm :model="deposito" ref="validation" @save="salvar(deposito)">
                        <div class="form-group col-10" style="display: flex;">
                            <label class="form-label col-2" style="margin-right:20px">Nome</label>
                            <div class="col-10" >
                                <input v-model="deposito.nome" id="nome" class="form-control"> 
                                <span name="nome" class="spanErro"></span>     
                            </div>
                        </div>

                        <div id="actionButtons" style="margin-top:50px">
                            <button v-if="deposito.id > 0" @click="excluir(deposito)" type="button" style="margin-right: 5px;" class="btn btn-secondary secondaryColorBtn">Excluir</button>
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
        name: 'CadastroEdicaoDepositoView',
        components: { ModalPergunta, ValidationForm, ToastComponent },
        data() {
            return {
                deposito: {
                    id: this.$route.params.codigoDeposito,
                    nome: null,
                },
            }
        },
        methods: {
            salvar(deposito) { 
                if(deposito.id > 0){
                    axios.post('deposito/update', deposito).then(
                        this.$refs.toast.ativar('Depósito salvo com sucesso.', 'sucesso'),
                        this.$router.back()
                    )
                }
                else{
                    axios.post('deposito/add', deposito).then(
                        this.$refs.toast.ativar('Depósito salvo com sucesso.', 'sucesso'),
                        this.$router.back()                 
                    )
                }      
            },           
            async excluir(deposito) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Depósito',
                    message: 'Tem certeza que gostaria de excluir o Depósito?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('deposito/delete', {id: deposito.id}).then(() => { 
                        this.$refs.toast.ativar('Depósito excluído com sucesso.', 'sucesso'),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('deposito/carregarRegistro', {id: this.deposito.id}).then( (result) => {
                    this.deposito.nome = result.data[0].nome                
                   }
                )
            },
        },
        mounted(){
            if(this.deposito.id > 0)
                this.recuperarDados()

            this.$refs.validation.required('nome','Nome')
        }

        
    }
</script>

<style>

.cardColuna{
    padding: 0
}

</style>

