<template>
    <div align="center" id="content">
        <h3 class="secondaryColor">Cadastro de Entrada</h3>
        <div align="center">
            <div class="card" style="width:75vw;">
                <div class="card-body" style="padding-top:35px; padding-bottom:30px;">
                    <ValidationForm :model="entrada" ref="validation" @save="salvar(entrada)">

                        <div class="form-group col-10" style="display: flex;">
                            <label class="col-2">Data</label>
                            <div class="col-4" >
                                <input v-model="entrada.data" id="nome" class="form-control" type="date"> 
                                <span name="data" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-2">Depósito</label>
                            <div class="col-4" >
                                <select v-model="entrada.depositoId" class="form-control">
                                    <option value=""></option> 
                                    <option v-for="deposito in depositos" :key="deposito.id" :value="deposito.id">
                                        {{ deposito.nome }}
                                    </option>
                                </select>
                                <span name="depositoId" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-2">Material</label>
                            <div class="col-4" >
                                <select v-model="entrada.materialId" class="form-control" v-on:change="carregarUnidade()">
                                    <option value=""></option> 
                                    <option v-for="material in materiais" :key="material.id" :value="material.id">
                                        {{ material.nome }}
                                    </option>
                                </select>
                                <span name="materialId" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top: 10px;">
                            <label class="col-2">Quantidade</label>
                            <div class="col-4" >
                                <div class="input-group mb-3" style="display: flex;  margin-bottom: 0 !important;">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">{{ unidadeMaterial }}</span>
                                    </div>
                                    <input type="number" class="form-control" v-model="entrada.quantidade" min="0">
                                </div> 
                                <span name="quantidade" class="spanErro"></span>    
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
                    depositoId: null,
                    materialId: null,
                    quantidade: null,
                    data: null
                },
                unidadeMaterial: '?',
                depositos: null,
                materiais: null
            }
        },
        methods: {
            salvar(entrada) { 
                if(entrada.id > 0){
                    axios.post('entrada/update', entrada).then(
                        this.$refs.toast.ativar('Entrada salva com sucesso.', 'sucesso'),
                        this.$router.back()
                    )
                }
                else{
                    axios.post('entrada/add', entrada).then(
                        this.$refs.toast.ativar('Entrada salva com sucesso.', 'sucesso'),
                        this.$router.back()                 
                    )
                }      
            },           
            async excluir(entrada) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Entrada',
                    message: 'Tem certeza que gostaria de excluir a entrada?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('entrada/delete', {id: entrada.id}).then(() => { 
                        this.$refs.toast.ativar('Entrada excluída com sucesso.', 'sucesso'),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('entrada/carregarRegistro', {id: this.entrada.id}).then( (result) => {
                        this.entrada.data = result.data.data 
                        this.entrada.depositoId = result.data.depositoId
                        this.entrada.materialId = result.data.materialId   
                        this.carregarUnidade()
                        this.entrada.quantidade = result.data.quantidade            
                   }
                )
            },
            carregarDepositos() {
                axios.post('deposito').then( (result) => {
                    this.depositos = result.data           
                   }
                )
            },
            carregarMateriais() {
                axios.post('material').then( (result) => {
                    this.materiais = result.data           
                   }
                )
            },
            carregarUnidade() {
                if(this.entrada.materialId > 0){
                    axios.post('material/carregarUnidadeMaterial', { "id": this.entrada.materialId }).then( (result) => {
                        this.unidadeMaterial = result.data.unidade         
                    })  
                }
                else {
                    this.unidadeMaterial = '?'
                }
                
            }
        },
        mounted(){
            if(this.entrada.id > 0)
                this.recuperarDados()

            this.carregarDepositos()
            this.carregarMateriais()
            this.$refs.validation.required('data','Data')
            this.$refs.validation.required('depositoId','Depósito')
            this.$refs.validation.required('materialId','Material')
            this.$refs.validation.required('quantidade','Quantidade')
        }

        
    }
</script>

<style>

.cardColuna{
    padding: 0
}

</style>

