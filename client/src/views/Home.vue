<template>
  <ToastComponent ref="toast"></ToastComponent>
</template>

<script>
import ToastComponent from '../components/ToastComponent.vue'
import { mapState } from 'vuex';

export default {
  name: 'BoardView',
  components: { ToastComponent },
  data(){
    return{
    }
  },
  computed: mapState(['sessaoValida']),
  methods:{ 
    
    
  },
  mounted(){
  },
  
}
</script>

<style>
.textoCard{
  font-size: small;
}
#divCard {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#divBoard{
  display:flex;
  max-width: 85vw;
  height: fit-content;
  overflow: auto;
}

.cardTask{
  background-color: black;
  color:white;
  height: 100px;
}

.colunm{
  width: 200px !important;
  min-height: 80vh !important;
  margin-right: 10px;
  min-width:200px;
}

.colunmLast{
  width: 20rem !important;
  min-height: 80vh !important;
  margin-right: 0px !important;
}

.insere{
  margin-bottom: 30px;
}
.spanErro{
  font-size: small;
}

.modal-content{
  width: 600px !important;
}

.card-title{
  margin-bottom: 20px !important;
}

.card{
  padding: 10px !important;
}

</style>
