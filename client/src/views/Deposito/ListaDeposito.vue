<template>
    <div align="center">
    <h3 class="secondaryColor" style="margin-bottom:40px">Lista Depósitos</h3>
    <button class="btn btn-primary primaryColorBtn" @click="inserir" style="margin-bottom:20px">Inserir Depósito <font-awesome-icon icon="fa-solid fa-plus"/></button>
    <div style="width:75vw">
        <DataTable ref="dataTable" :colLabels="colLabels" :dataFields="dataFields" :dataUrl="'deposito'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" :id="'id'" ></DataTable>
    </div>

    <ModalPergunta ref="modalPergunta"></ModalPergunta>
  </div>
  <ToastComponent ref="toast"></ToastComponent>
    
</template>

<script>

import ModalPergunta from '../../components/ModalPergunta.vue'
import DataTable from '../../components/DataTable.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import axios from 'axios'

  export default {
        name: 'ListaDepositoView',
        components: { DataTable, ModalPergunta, ToastComponent },
        data() {
            return {
                colLabels: ['Nome'],
                dataFields: [
                  {"field": 'nome', "type": 'text'}
                ],
            }
        },
        methods: {
          inserir(){
            this.$router.push({ name: 'CadastroEdicaoDeposito', params: { codigoDeposito: 0 } })
          },
          editar(deposito){
            this.$router.push({ name: 'CadastroEdicaoDeposito', params: { codigoDeposito: deposito.id } })
          },
          async excluir(deposito) { 
            const ok = await this.$refs.modalPergunta.show({
                title: 'Excluir Depósito',
                message: 'Tem certeza que gostaria de excluir o Deposito?',
                okButton: 'Sim',
            })

            if (ok) {
                axios.post('deposito/delete', {id: deposito.id}).then(() => {
                      this.$refs.toast.ativar('Deposito excluído com sucesso.', 'sucesso'),
                      this.$refs.dataTable.load()
                })
            }
          },
        },  
        mounted(){
        }      
    }
</script>
