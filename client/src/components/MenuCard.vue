<template>
    <ul id="menu" class="list-group">
      <li class="list-group-item menuItem" @click="abrirModal()">Abrir</li>
      <li class="list-group-item menuItem" @click="excluir(idCardSelecionado)">Excluir</li>
    </ul>
</template>

<script>
export default {
    name: 'MenuCard',
    data: () => ({
        idCardSelecionado: 0,
        idColunaSelecionada: 0
    }),
    methods: {
        abrir(card, x, y){
            this.idCardSelecionado = card.id;
            this.idColunaSelecionada = card.colunaId;
            const menu = document.getElementById("menu");
            menu.style.visibility = 'visible'
            menu.style.top = `${y}px`
            menu.style.left = `${x}px`
        },
        fechar(){
            const menu = document.getElementById("menu");
            menu.style.visibility = 'hidden'
        },
        abrirModal(){
            this.$parent.$refs.modal.abrir(this.idCardSelecionado, this.idColunaSelecionada)
        },
        excluir(){
            this.$parent.excluir(this.idCardSelecionado)
        }
    },
}
</script>

<style>
    #menu{
        width: 150px;
        height: 250px;
        visibility: hidden;
        position:absolute;
    }

    .menuItem:hover{
        background-color:darkgray ;
    }

    .menuItem{
        font-size: small;
    }
   
</style>