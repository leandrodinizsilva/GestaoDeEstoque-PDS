<template>
    <div align="center" id="content">
        <h3 class="secondaryColor">Cadastro de Material</h3>
        <div align="center">
            <div class="card" style="width:75vw;">
                <div class="card-body" style="padding-top:35px; padding-bottom:30px;">
                    <ValidationForm :model="material" ref="validation" @save="salvar(material)">
                        <div class="form-group col-10" style="display: flex;">
                            <label class="col-2">Nome</label>
                            <div class="col-10" >
                                <input v-model="material.nome" id="nome" class="form-control"> 
                                <span name="nome" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-2">Unidade</label>
                            <div class="col-4" >
                                <select v-model="material.unidadeId" class="form-control">
                                    <option value=""></option> 
                                    <option v-for="unidade in unidades" :key="unidade.id" :value="unidade.id">
                                        {{ unidade.nome }}
                                    </option>
                                </select>
                                <span name="unidadeId" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top: 10px;">
                            <label class="col-2">Preço</label>
                            <div class="col-4" >
                                <div class="input-group mb-3" style="display: flex;  margin-bottom: 0 !important;">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">R$</span>
                                    </div>
                                    <input type="number" class="form-control" v-model="material.preco" step="0.01" min="0">
                                </div> 
                                <span name="preco" class="spanErro"></span>    
                            </div>
                        </div>

                        <div id="actionButtons" style="margin-top:50px">
                            <button v-if="material.id > 0" @click="excluir(material)" type="button" style="margin-right: 5px;" class="btn btn-secondary secondaryColorBtn">Excluir</button>
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
        name: 'CadastroEdicaomaterialView',
        components: { ModalPergunta, ValidationForm, ToastComponent },
        data() {
            return {
                material: {
                    id: this.$route.params.codigoMaterial,
                    nome: null,
                    unidadeId: null,
                    preco: null,
                },
                unidades: null
            }
        },
        methods: {
            salvar(material) { 
                if(material.id > 0){
                    axios.post('material/update', material).then(
                        this.$refs.toast.ativar('Material salvo com sucesso.', 'sucesso'),
                        this.$router.back()
                    )
                }
                else{
                    axios.post('material/add', material).then(
                        this.$refs.toast.ativar('Material salvo com sucesso.', 'sucesso'),
                        this.$router.back()                 
                    )
                }      
            },           
            async excluir(material) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Material',
                    message: 'Tem certeza que gostaria de excluir o Material?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('material/delete', {id: material.id}).then(() => { 
                        this.$refs.toast.ativar('Material excluído com sucesso.', 'sucesso'),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('material/carregarRegistro', {id: this.material.id}).then( (result) => {
                        this.material.nome = result.data.nome 
                        this.material.preco = result.data.preco
                        this.material.unidadeId = result.data.unidadeId               
                   }
                )
            },
            carregarUnidades() {
                axios.post('unidade').then( (result) => {
                    this.unidades = result.data           
                   }
                )
            }
        },
        mounted(){
            if(this.material.id > 0)
                this.recuperarDados()

            this.carregarUnidades()

            this.$refs.validation.required('nome','Nome')
            this.$refs.validation.required('unidadeId','Unidade')
            this.$refs.validation.required('preco','Preço')
        }

        
    }
</script>

<style>

.cardColuna{
    padding: 0
}

</style>

