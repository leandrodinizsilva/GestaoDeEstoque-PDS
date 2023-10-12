<template>
    <div align="center" id="content">
        <h3 class="secondaryColor">Cadastro de Transferência</h3>
        <div align="center">
            <div class="card" style="width:75vw;">
                <div class="card-body" style="padding-top:35px; padding-bottom:30px;">
                    <ValidationForm :model="transferencia" ref="validation" @save="salvar(transferencia)">

                        <div class="form-group col-10" style="display: flex;">
                            <label class="col-3">Data</label>
                            <div class="col-4" >
                                <input v-model="transferencia.data" id="nome" class="form-control" type="date"> 
                                <span name="data" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-3">Origem</label>
                            <div class="col-4" >
                                <select v-model="transferencia.depositoOrigemId" class="form-control" v-on:change="carregarDepositosDestino()">
                                    <option value=""></option> 
                                    <option v-for="deposito in depositosOrigem" :key="deposito.id" :value="deposito.id">
                                        {{ deposito.nome }}
                                    </option>
                                </select>
                                <span name="depositoId" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-3">Destino</label>
                            <div class="col-4" >
                                <select v-model="transferencia.depositoDestinoId" class="form-control">
                                    <option value=""></option> 
                                    <option v-for="deposito in depositosDestino" :key="deposito.id" :value="deposito.id">
                                        {{ deposito.nome }}
                                    </option>
                                </select>
                                <span name="depositoId" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top:10px">
                            <label class="col-3">Material</label>
                            <div class="col-4" >
                                <select v-model="transferencia.materialId" class="form-control" v-on:change="carregarUnidade()">
                                    <option value=""></option> 
                                    <option v-for="material in materiais" :key="material.id" :value="material.id">
                                        {{ material.nome }}
                                    </option>
                                </select>
                                <span name="materialId" class="spanErro"></span>     
                            </div>
                        </div>

                        <div class="form-group col-10" style="display: flex; margin-top: 10px;">
                            <label class="col-3">Quantidade</label>
                            <div class="col-4" >
                                <div class="input-group mb-3" style="display: flex;  margin-bottom: 0 !important;">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">{{ unidadeMaterial }}</span>
                                    </div>
                                    <input type="number" class="form-control" v-model="transferencia.quantidade" min="0">
                                </div> 
                                <span name="quantidade" class="spanErro"></span>    
                            </div>
                        </div>

                        <div id="actionButtons" style="margin-top:50px">
                            <button v-if="transferencia.id > 0" @click="excluir(transferencia)" type="button" style="margin-right: 5px;" class="btn btn-secondary secondaryColorBtn">Excluir</button>
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
        name: 'CadastroEdicaotransferenciaView',
        components: { ModalPergunta, ValidationForm, ToastComponent },
        data() {
            return {
                transferencia: {
                    id: this.$route.params.codigoTransferencia,
                    depositoOrigemId: null,
                    depositoDestinoId: null,
                    materialId: null,
                    quantidade: null,
                    data: null
                },
                unidadeMaterial: '?',
                depositosOrigem: null,
                depositosDestino: null,
                materiais: null
            }
        },
        methods: {
            salvar(transferencia) { 
                console.log(transferencia)
                if(transferencia.id > 0){
                    axios.post('transferencia/update', transferencia).then(() => {
                            this.$refs.toast.ativar('Transferência salva com sucesso.', 'sucesso'),
                            this.$router.back()
                        }
                    )
                }
                else{
                    axios.post('transferencia/add', transferencia).then(()=>{
                            this.$refs.toast.ativar('Transferência salva com sucesso.', 'sucesso'),
                            this.$router.back()    
                        }             
                    )
                }      
            },           
            async excluir(transferencia) { 
                const ok = await this.$refs.modalPergunta.show({
                    title: 'Excluir Transferência',
                    message: 'Tem certeza que gostaria de excluir a transferência?',
                    okButton: 'Sim',
                })

                if (ok) {
                    axios.post('transferencia/delete', {id: transferencia.id}).then(() => { 
                        this.$refs.toast.ativar('Transferência excluída com sucesso.', 'sucesso'),
                        this.$router.back()
                    })
                }
            },
            recuperarDados() { 
                axios.post('transferencia/carregarRegistro', {id: this.transferencia.id}).then( (result) => {
                        this.transferencia.data = result.data.data 
                        this.transferencia.depositoOrigemId = result.data.depositoOrigemId
                        this.carregarDepositosDestino()
                        this.transferencia.depositoDestinoId = result.data.depositoDestinoId
                        this.transferencia.materialId = result.data.materialId 
                        this.carregarUnidade()  
                        this.transferencia.quantidade = result.data.quantidade            
                   }
                )
            },
            carregarDepositos() {
                axios.post('deposito').then( (result) => {
                    this.depositosOrigem = result.data       
                   }
                )
            },
            carregarDepositosDestino(){
                axios.post('transferencia/carregarDepositosDestino', {"depositoOrigemId": this.transferencia.depositoOrigemId}).then( (result) =>{
                    this.depositosDestino = result.data
                })
            },
            carregarMateriais() {
                axios.post('material').then( (result) => {
                    this.materiais = result.data           
                   }
                )
            },
            carregarUnidade() {
                if(this.transferencia.materialId > 0){
                    axios.post('material/carregarUnidadeMaterial', { "id": this.transferencia.materialId }).then( (result) => {
                        this.unidadeMaterial = result.data.unidade         
                    })  
                }
                else {
                    this.unidadeMaterial = '?'
                }
                
            }
        },
        mounted(){
            if(this.transferencia.id > 0)
                this.recuperarDados()

            this.carregarDepositos()
            this.carregarMateriais()
            this.$refs.validation.required('data','Data')
            this.$refs.validation.required('depositoOrigemId','Depósito')
            this.$refs.validation.required('depositoDestinoId','Depósito')
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

