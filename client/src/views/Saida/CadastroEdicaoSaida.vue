<template>
    <div align="center" id="content">
        <h3 class="secondaryColor">Cadastro de Sáida</h3>
        <div align="center">
            <div class="card" style="width:75vw;">
                <div class="card-body" style="padding-top:35px; padding-bottom:30px;">
                    <ValidationForm :model="saida" ref="validation" @save="salvar(saida)">

                        <div class="form-group col-10" style="display: flex;">
                            <label class="col-2">Data</label>
                            <div class="col-4" >
                                <input v-model="saida.data" id="nome" class="form-control" type="date"> 
                                <span name="data" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-2">Depósito</label>
                            <div class="col-4" >
                                <select v-model="saida.depositoId" class="form-control">
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
                                <select v-model="saida.materialId" class="form-control" v-on:change="carregarUnidade()">
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
                                    <input type="number" class="form-control" v-model="saida.quantidade" min="0">
                                </div> 
                                <span name="quantidade" class="spanErro"></span>    
                            </div>
                        </div>

                        <div id="actionButtons" style="margin-top:50px">
                            <button v-if="saida.id > 0" @click="excluir(saida)" type="button" style="margin-right: 5px;" class="btn btn-secondary secondaryColorBtn">Excluir</button>
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
        name: 'CadastroEdicaoSaidaView',
        components: { ModalPergunta, ValidationForm, ToastComponent },
        data() {
            return {
                saida: {
                    id: this.$route.params.codigoSaida,
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
            salvar(saida) { 
                if(saida.id > 0){
                    axios.post('saida/update', saida).then(() => {
                            this.$refs.toast.ativar('Saída salva com sucesso.', 'sucesso'),
                            this.$router.back()
                        }
                    )
                }
                else{
                    axios.post('saida/add', saida).then(()=>{
                            this.$refs.toast.ativar('Saída salva com sucesso.', 'sucesso'),
                            this.$router.back()    
                        }             
                    )
                }      
            },           
            async excluir(saida) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Saída',
                    message: 'Tem certeza que gostaria de excluir a saída?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('saida/delete', {id: saida.id}).then(() => { 
                        this.$refs.toast.ativar('Saída excluída com sucesso.', 'sucesso'),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('saida/carregarRegistro', {id: this.saida.id}).then( (result) => {
                        this.saida.data = result.data.data 
                        this.saida.depositoId = result.data.depositoId
                        this.saida.materialId = result.data.materialId 
                        this.carregarUnidade()  
                        this.saida.quantidade = result.data.quantidade            
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
                if(this.saida.materialId > 0){
                    axios.post('material/carregarUnidadeMaterial', { "id": this.saida.materialId }).then( (result) => {
                        this.unidadeMaterial = result.data.unidade         
                    })  
                }
                else {
                    this.unidadeMaterial = '?'
                }
                
            }
        },
        mounted(){
            if(this.saida.id > 0)
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

