<template>
    <div align="center">
    <h3 class="secondaryColor" style="margin-bottom:40px">Lista Estoque do Deposito</h3>
    <div style="width:75vw">
        <DataTable ref="dataTable" :colLabels="colLabels" :paramsUrl="{codigoDeposito: $route.params.codigoDeposito, codigoUsuario: dataFields.id}" :dataFields="dataFields" :dataUrl="'/deposito/listaDepositoPermissao'" :showEditButton="true" @editar="editar" :id="'id'" ></DataTable>
    </div>

    <ModalPergunta ref="modalPergunta"></ModalPergunta>
  </div>
  <ToastComponent ref="toast"></ToastComponent>
</template>

<script>

import ModalPergunta from '../../components/ModalPergunta.vue'
import DataTable from '../../components/DataTable.vue'
import ToastComponent from '@/components/ToastComponent.vue'
// import axios from 'axios'

  export default {
        name: 'ListaDepositoPermissao',
        components: { DataTable, ModalPergunta, ToastComponent },
        data() {
            return {
                colLabels: ['Nome', 'Permissão'],
                dataFields: [
                  {"field": 'nome', "type": 'text'},
                  {"field": 'descricao', "type": 'number'}
                ],
            }
        },
        methods: {

          editar(entrada){
            this.$router.push({ name: 'DepositoPermissaoEditar', params: { codigoEntrada: entrada.id, codigoUsuario: entrada.id } })
          },
        },  
        mounted(){
        }      
    }
</script>

