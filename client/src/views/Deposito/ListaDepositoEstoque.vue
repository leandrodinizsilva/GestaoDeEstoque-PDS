<template>
    <div align="center">
    <h3 class="secondaryColor" style="margin-bottom:40px">Lista Estoque do Deposito</h3>
    <button class="btn btn-primary primaryColorBtn" @click="inserir" style="margin-bottom:20px">Inserir Entrada <font-awesome-icon icon="fa-solid fa-plus"/></button>
    <div style="width:75vw">
        <DataTable ref="dataTable" :colLabels="colLabels" :paramsUrl="{codigoDeposito: $route.params.codigoDeposito}" :dataFields="dataFields" :dataUrl="'/deposito/listaDepositoEstoque'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" :id="'id'" ></DataTable>
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
        name: 'ListaDepositoEstoque',
        components: { DataTable, ModalPergunta, ToastComponent },
        data() {
            return {
                colLabels: ['Material', 'Quantidade', 'Unidade'],
                dataFields: [
                  {"field": 'nome', "type": 'text'},
                  {"field": 'quantidade', "type": 'number'},
                  {"field": 'nomeUnidade', "type": 'text'}
                ],
            }
        },
        methods: {
          inserir(){
            this.$router.push({ name: 'CadastroEdicaoEntrada', params: { codigoEntrada: 0 } })
          },
          editar(entrada){
            this.$router.push({ name: 'CadastroEdicaoEntrada', params: { codigoEntrada: entrada.id } })
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
                      this.$refs.dataTable.load()
                })
            }
          },
        },  
        mounted(){
        }      
    }
</script>

