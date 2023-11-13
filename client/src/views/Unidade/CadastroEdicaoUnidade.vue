<template>
    <div align="center" id="content">
        <h3 class="secondaryColor">Cadastro de Unidade</h3>
        <div align="center">
            <div class="card" style="width:75vw;">
                <div class="card-body" style="padding-top:35px; padding-bottom:30px;">
                    <ValidationForm :model="unidade" ref="validation" @save="salvar(unidade)">
                        <div class="form-group col-10" style="display: flex;">
                            <label class="form-label col-2" style="margin-right:20px">Nome</label>
                            <div class="col-10" >
                                <input v-model="unidade.nome" id="nome" class="form-control"> 
                                <span name="nome" class="spanErro"></span>     
                            </div>
                        </div>

                        <div id="actionButtons" style="margin-top:50px">
                            <button v-if="unidade.id > 0" @click="excluir(unidade)" type="button" style="margin-right: 5px;" class="btn btn-secondary secondaryColorBtn">Excluir</button>
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
        name: 'CadastroEdicaoUnidadeView',
        components: { ModalPergunta, ValidationForm, ToastComponent },
        data() {
            return {
                unidade: {
                    id: this.$route.params.codigoUnidade,
                    nome: null,
                },
            }
        },
        methods: {
            salvar(unidade) { 
                if(unidade.id > 0){
                    axios.post('unidade/update', unidade).then(
                        this.$refs.toast.ativar('Unidade salvo com sucesso.', 'sucesso'),
                        this.$router.back()
                    )
                }
                else{
                    axios.post('unidade/add', unidade).then(
                        this.$refs.toast.ativar('Unidade salvo com sucesso.', 'sucesso'),
                        this.$router.back()                 
                    )
                }      
            },           
            async excluir(unidade) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Unidade',
                    message: 'Tem certeza que gostaria de excluir o Unidade?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('unidade/delete', {id: unidade.id}).then(() => { 
                        this.$refs.toast.ativar('Unidade excluído com sucesso.', 'sucesso'),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('unidade/carregarRegistro', {id: this.unidade.id}).then( (result) => {
                    this.unidade.nome = result.data.nome                
                   }
                )
            },
        },
        mounted(){
            if(this.unidade.id > 0)
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

