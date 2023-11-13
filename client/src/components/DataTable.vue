<template>
    <table class="table" style="margin-top:20px;">
        <thead>
            <tr>
                <th style="width:20%" v-if="showEditButton || showRemoveButton || showAddButton || showStock"></th>
                <th v-for="(value, index) in colLabels" :key="index" class="secondaryColor" scope="col">{{value}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data" :key="index">
                <td v-if="showEditButton || showRemoveButton ||  showAddButton || showStock" align="center">
                    <button title="Editar" style="margin-left:10px;"  v-if="showEditButton" type="button" @click="$emit('editar', item )" class="btn btn-primary primaryColorBtn">
                        <font-awesome-icon icon="fa-solid fa-pen" />
                    </button>
                    <button v-if="showAddButton" style="margin-left:10px;" type="button" @click="$emit('addItem', item[id] )" class="btn btn-primary primaryColorBtn">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </button>
                    <button title="Excluir"  v-if="showRemoveButton" style="margin-left:10px;" type="button" @click="$emit('excluir', item )" class="btn btn-secondary secondaryColorBtn">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </button>
                    <button title="Exibir Estoque"  v-if="showStock" style="margin-left:10px;" type="button" @click="$emit('exibirEstoque', item )" class="btn btn-secondary secondaryColorBtn">
                        <font-awesome-icon icon="fa-solid fa-warehouse" />
                    </button>
                    <button title="Alterar Permissões"  v-if="showEditAccess" style="margin-left:10px;" type="button" @click="$emit('editarPermissao', item )" class="btn btn-secondary secondaryColorBtn">
                        <font-awesome-icon icon="fa-solid fa-square-check" />
                    </button>

                </td>
                <td v-for="(dataField, index) in dataFields" :key="index">{{item[dataField.field]}}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                        <a @click="prevPage" class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                        </li>
                        <li class="page-item" v-for="pagina in pages" :key="pagina" @click="setPage(pagina)" :disabled="pagina === paginaAtual"><a class="page-link" href="#">{{ pagina }}</a></li>
                        <li class="page-item">
                        <a @click="nextPage" class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </tr>
        </tfoot>
    </table>
</template>

<script>
  import axios from 'axios'
  export default {
        name: 'DataTable',
        props: {
            colLabels: null,
            dataFields: null,
            showEditButton: null,
            showRemoveButton: null,
            showAddButton: null,
            showStock: null,
            showEditAccess: null,
            dataUrl: null,
            paramsUrl: null,
            id: null,
            pageSize: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                data: null,
                originalData: null,
                totalPaginas: 0,
                paginaAtual: 1,
                pages: [],
            }
        },
        methods: {
            filter(propertyName, value) {
                this.data = this.originalData
                if (value) {
                    this.data = this.data.filter(function (el) {
                        return el[propertyName].toLowerCase().includes(value.toLowerCase())
                    });
                } 
            },
            calculatotalPaginas() {
                this.totalPaginas =  Math.ceil(this.originalData.length / this.pageSize)
            },
            dataPaginado() {
                const start = (this.paginaAtual - 1) * this.pageSize
                const end = start + this.pageSize
                this.data = this.originalData.slice(start, end)
            },
            nextPage() {
                if(this.paginaAtual < this.totalPaginas)
                    this.paginaAtual++
                    this.setShownPages()
                    this.$store.commit('setPagina', this.paginaAtual)
                    this.dataPaginado()
            },
            prevPage() {
                if(this.paginaAtual > 1){
                    this.paginaAtual--
                    this.setShownPages()
                    this.$store.commit('setPagina', this.paginaAtual)
                    this.dataPaginado()
                }
            },
            setPage(pagina) {
                if(pagina > 0){
                    this.paginaAtual = pagina
                    this.setShownPages()
                    this.$store.commit('setPagina', pagina)
                    this.dataPaginado()
                }
            },
            dataOp(result){
                this.originalData = result
                this.data = this.originalData
                this.dataPaginado()
                this.calculatotalPaginas()                 
                this.setPage(this.$store.state.paginaAtual)  
                if(this.data.length == 0) 
                    this.setPage(this.$store.state.paginaAtual-1) 
            },
            load(){
                console.log(this.paramsUrl);
                if(!this.paramsUrl){
                    axios.post(this.dataUrl).then( (result) => {
                        this.dataOp(this.formatData(result.data))
                    })
                }
                else{
                    axios.post(this.dataUrl, this.paramsUrl).then( (result) => {
                        this.dataOp(this.formatData(result.data))        
                    })
                } 
            },
            formatData(data){
                data.forEach(element => {
                    for(var prop in element){
                        if (Object.prototype.hasOwnProperty.call(element, prop)) {
                            var dataField = this.dataFields.find((dataField) => dataField.field == prop);
                            if(dataField != null) {
                                if(dataField.type == 'date'){
                                    var date = new Date(element[prop])
                                    var day = ""
                                    var month = ""
                                    if(date.getUTCDate() < 10)
                                        day = '0' + date.getUTCDate()
                                    else
                                        day = date.getUTCDate()

                                    if(date.getUTCMonth() + 1 < 10)
                                        month = '0' + (date.getUTCMonth() + 1)
                                    else
                                        month = (date.getUTCMonth() + 1)

                                    element[prop] = day + "/" + month + "/" + date.getUTCFullYear() 
                                }
                                if(dataField.format == 'r2'){
                                    element[prop] = "R$ " + element[prop].toFixed(2)
                                }
                            }
                        }
                    }
                })
                return data
            },
            setShownPages(){
                this.pages = [this.paginaAtual - 1 , this.paginaAtual, this.paginaAtual + 1]
                    this.pages = this.pages.filter( el => {
                        return el > 0 && el <= this.totalPaginas
                })
            },
            
        },
        created() {
            this.load()
        },
    }
</script>
<style>
.page-link{
    border: 0 !important;
    color:gray;
}
.page-link:hover{
    color:#bc6c25;
}
.page-link:focus {
    color:#bc6c25 !important;
    box-shadow: none !important;
}
</style>



