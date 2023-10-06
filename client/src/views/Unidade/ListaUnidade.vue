<template>
    <div align="center">
    <h3 class="secondaryColor" style="margin-bottom:40px">Lista Unidades</h3>
    <button class="btn btn-primary primaryColorBtn" @click="inserir" style="margin-bottom:20px">Inserir Unidade <font-awesome-icon icon="fa-solid fa-plus"/></button>
    <div style="width:75vw">
        <DataTable ref="dataTable" :colLabels="colLabels" :dataFields="dataFields" :dataUrl="'Unidade'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" :id="'id'" ></DataTable>
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
        name: 'ListaUnidadeView',
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
            this.$router.push({ name: 'CadastroEdicaoUnidade', params: { codigoUnidade: 0 } })
          },
          editar(unidade){
            this.$router.push({ name: 'CadastroEdicaoUnidade', params: { codigoUnidade: unidade.id } })
          },
          async excluir(unidade) { 
            const ok = await this.$refs.modalPergunta.show({
                title: 'Excluir Unidade',
                message: 'Tem certeza que gostaria de excluir a Unidade?',
                okButton: 'Sim',
            })

            if (ok) {
                axios.post('unidade/delete', {id: unidade.id}).then(() => {
                      this.$refs.toast.ativar('Unidade excluída com sucesso.', 'sucesso'),
                      this.$refs.dataTable.load()
                })
            }
          },
        },  
        mounted(){
        }      
    }
</script>
