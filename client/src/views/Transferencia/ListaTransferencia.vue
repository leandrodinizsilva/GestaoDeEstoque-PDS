<template>
    <div align="center">
    <h3 class="secondaryColor" style="margin-bottom:40px">Lista Transferências</h3>
    <button class="btn btn-primary primaryColorBtn" @click="inserir" style="margin-bottom:20px">Inserir Transferência <font-awesome-icon icon="fa-solid fa-plus"/></button>
    <div style="width:75vw">
        <DataTable ref="dataTable" :colLabels="colLabels" :dataFields="dataFields" :dataUrl="'transferencia'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" :id="'id'" ></DataTable>
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
        name: 'ListatransferenciaView',
        components: { DataTable, ModalPergunta, ToastComponent },
        data() {
            return {
                colLabels: ['Data', 'Origem', 'Destino', 'Material', 'Quantidade', 'Unidade'],
                dataFields: [
                  {"field": 'data', "type": 'date'},
                  {"field": 'nomeDepositoOrigem', "type": 'text'},
                  {"field": 'nomeDepositoDestino', "type": 'text'},
                  {"field": 'nomeMaterial', "type": 'text'},
                  {"field": 'quantidade', "type": 'number'},
                  {"field": 'nomeUnidade', "type": 'text'}
                ],
            }
        },
        methods: {
          inserir(){
            this.$router.push({ name: 'CadastroEdicaoTransferencia', params: { codigoTransferencia: 0 } })
          },
          editar(transferencia){
            this.$router.push({ name: 'CadastroEdicaoTransferencia', params: { codigoTransferencia: transferencia.id } })
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
                      this.$refs.dataTable.load()
                })
            }
          },
        },  
        mounted(){
        }      
    }
</script>

