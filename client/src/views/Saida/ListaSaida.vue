<template>
    <div align="center">
    <h3 class="secondaryColor" style="margin-bottom:40px">Lista Saídas</h3>
    <button class="btn btn-primary primaryColorBtn" @click="inserir" style="margin-bottom:20px">Inserir Saída <font-awesome-icon icon="fa-solid fa-plus"/></button>
    <div style="width:75vw">
        <DataTable ref="dataTable" :colLabels="colLabels" :dataFields="dataFields" :dataUrl="'saida'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" :id="'id'" ></DataTable>
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
        name: 'ListaSaidaView',
        components: { DataTable, ModalPergunta, ToastComponent },
        data() {
            return {
                colLabels: ['Data', 'Depósito', 'Material', 'Quantidade', 'Unidade'],
                dataFields: [
                  {"field": 'data', "type": 'date'},
                  {"field": 'nomeDeposito', "type": 'text'},
                  {"field": 'nomeMaterial', "type": 'text'},
                  {"field": 'quantidade', "type": 'number'},
                  {"field": 'nomeUnidade', "type": 'text'}
                ],
            }
        },
        methods: {
          inserir(){
            this.$router.push({ name: 'CadastroEdicaoSaida', params: { codigoSaida: 0 } })
          },
          editar(saida){
            this.$router.push({ name: 'CadastroEdicaoSaida', params: { codigoSaida: saida.id } })
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
                      this.$refs.dataTable.load()
                })
            }
          },
        },  
        mounted(){
        }      
    }
</script>

