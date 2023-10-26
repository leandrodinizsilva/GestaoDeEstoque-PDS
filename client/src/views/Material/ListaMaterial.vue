<template>
    <div align="center">
    <h3 class="secondaryColor" style="margin-bottom:40px">Lista Materiais</h3>
    <button v-if="this.$store.state.usuario.tipo != 1" class="btn btn-primary primaryColorBtn" @click="inserir" style="margin-bottom:20px">Inserir Material <font-awesome-icon icon="fa-solid fa-plus"/></button>
    <div style="width:75vw">
        <DataTable ref="dataTable" :colLabels="colLabels" :dataFields="dataFields" :dataUrl="'material'" :showEditButton="true" :showRemoveButton="true" @editar="editar" @excluir="excluir" :id="'id'" ></DataTable>
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
        name: 'ListaMaterialView',
        components: { DataTable, ModalPergunta, ToastComponent },
        data() {
            return {
                colLabels: ['Nome', 'Preco', 'Unidade'],
                dataFields: [
                  {"field": 'nome', "type": 'text'},
                  {"field": 'preco', "type": 'number'},
                  {"field": 'nomeUnidade', "type": 'text'},
                ],
            }
        },
        methods: {
          inserir(){
            this.$router.push({ name: 'CadastroEdicaoMaterial', params: { codigodeDeposito: this.$route.params.codigodeDeposito ,codigoMaterial: 0 } })
          },
          editar(material){
            this.$router.push({ name: 'CadastroEdicaoMaterial', params: { codigoMaterial: material.id } })
          },
          async excluir(material) { 
            console.log(material)
            const ok = await this.$refs.modalPergunta.show({
                title: 'Excluir Material',
                message: 'Tem certeza que gostaria de excluir o Material?',
                okButton: 'Sim',
            })

            if (ok) {
                axios.post('material/delete', {id: material.id}).then(() => {
                      this.$refs.toast.ativar('Material excluído com sucesso.', 'sucesso'),
                      this.$refs.dataTable.load()
                })
            }
          },
        },  
        mounted(){
        }      
    }
</script>

